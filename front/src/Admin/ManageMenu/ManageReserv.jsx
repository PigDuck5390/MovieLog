import ManagementHead from '../ManagementHead.jsx'
import { useState, useEffect } from 'react'
import { API } from '../../api.js'

function ManageReserv() {

    const [reservData, setReservData] = useState([])
    const [newReservData, setNewReservData] = useState({})

    const today = new Date().toISOString().split('T')[0];

    // infinite re-render 수정: [] 사용
    useEffect(() => {
        fetch(`${API}/seatlist`)
            .then(response => response.json())
            .then(data => setReservData(data))
    }, [])

    function reservAdd() {
        const confirm = window.confirm(
            "임의로 예매를 추가하는 것은 특수한 경우가 아니라면 권장하지 않습니다. 계속하시겠습니까?")
        if (!confirm) {
            return
        }
        fetch(`${API}/seat/add`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newReservData),
        })
        alert("예매가 추가되었습니다.")
    }

    function reservEdit(id, item, itemKey) {
        const newData = prompt("수정할 내용을 입력해주세요.", item)
        if (!newData) {
            alert("내용이 입력되지 않았습니다.")
            return
        }
        fetch(`${API}/seat/update`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                seatId: id,
                field: itemKey,
                newData: newData
            })
        })
    }

    function reservDel(id) {
        const confirm = window.confirm("임의로 예매를 추가하는 것은 특수한 경우가 아니라면 권장하지 않습니다. 계속하시겠습니까?")
        if (confirm) {
            fetch(`${API}/seat/delete`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ seatId: id })
            })
        }
    }

    return (
        <div className="admin-page admin-reserv-page">
            <ManagementHead />

            <main className="admin-main">
                <h1 className="admin-title">예매 관리</h1>

                <section className="admin-section admin-section--form">
                    <h2 className="admin-subtitle">예매 추가</h2>

                    <div className="admin-form admin-form--columns">
                        <div className="admin-form-column">
                            <div className="admin-form-row">
                                <label className="admin-label">예매자 이름</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='예매자 이름'
                                    value={newReservData.userName || ''}
                                    onChange={(e) => setNewReservData({ ...newReservData, userName: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">예매자 아이디</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='예매자 아이디'
                                    value={newReservData.user_id || ''}
                                    onChange={(e) => setNewReservData({ ...newReservData, user_id: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">영화 제목</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='영화 제목'
                                    value={newReservData.movie_name || ''}
                                    onChange={(e) => setNewReservData({ ...newReservData, movie_name: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">예매 날짜</label>
                                <input
                                    className="admin-input admin-input--date"
                                    type="date"
                                    value={newReservData.date || ''}
                                    min={today}
                                    onChange={(e) => setNewReservData({ ...newReservData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="admin-form-column">
                            <div className="admin-form-row">
                                <label className="admin-label">예매 시간</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newReservData.time || ''}
                                    onChange={(e) => setNewReservData({ ...newReservData, time: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">좌석 번호</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='ex) A1,A2,A3'
                                    value={newReservData.seat_num || ''}
                                    onChange={(e) => setNewReservData({ ...newReservData, seat_num: e.target.value })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영관</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='관 빼고 숫자만 입력 ex) 1'
                                    value={newReservData.screen_num || ''}
                                    onChange={(e) => setNewReservData({ ...newReservData, screen_num: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        className="admin-button admin-button--primary admin-add-button"
                        onClick={reservAdd}
                    >
                        신규 예매 추가
                    </button>
                </section>

                <section className="admin-section admin-section--list">
                    <h2 className="admin-subtitle">예매 내역 / 수정 및 삭제</h2>

                    <div className="admin-grid admin-grid--reserv">
                        {reservData.map((item) =>
                            <div className="admin-card admin-card--reserv" key={item.seat_id}>
                                <p className="admin-text admin-reserv-code">
                                    예매번호 : 0{item.screen_num}-{item.seat_id * item.seat_id}
                                </p>
                                <button
                                    className="admin-button admin-button--danger admin-button--small"
                                    onClick={() => reservDel(item.seat_id)}
                                >
                                    예매 삭제
                                </button>

                                <p className="admin-text">
                                    예매자 이름 : {item.userName}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.userName, "userName")}>수정</button>
                                </p>

                                <p className="admin-text">
                                    예매자 아이디 : {item.user_id}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.user_id, "user_id")}>수정</button>
                                </p>

                                <p className="admin-text">
                                    영화 제목 : {item.movie_name}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.movie_name, "movie_name")}>수정</button>
                                </p>

                                <p className="admin-text">
                                    예매 날짜 : {item.date}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.date, "date")}>수정</button>
                                </p>

                                <p className="admin-text">
                                    예매 시간 : {item.time}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.time, "time")}>수정</button>
                                </p>

                                <p className="admin-text seat-row">
                                    좌석 번호 : {item.seat_num.split(",").join(", ")}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.seat_num, "seat_num")}>수정</button>
                                </p>

                                <p className="admin-text">
                                    상영관 : {item.screen_num}
                                    <button className="admin-button admin-button--tiny"
                                        onClick={() => reservEdit(item.seat_id, item.screen_num, "screen_num")}>수정</button>
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ManageReserv
