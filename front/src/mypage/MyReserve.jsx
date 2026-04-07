import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MainHeader from "../Main/MainHeader";
import "../css/MyReserve.css";
import { API } from '../api.js';

function MyReserve() {
    const navigate = useNavigate();
    const { state : userInfo } = useLocation();
    const [seatData, setSeatData] = useState([]);

    useEffect(() => {
        fetch(`${API}/seatlist/${userInfo.id}`)
            .then(response => response.json())
            .then(data => setSeatData(data))
    }, []);

    //개인정보 변경 이동
    function goMyInfoEdit() {
        navigate('/myinfo', { state: { name: userInfo.name, id: userInfo.id } });
    }

    //내 정보 이동
    function goMyPage(){
        navigate('/mypage', {
            state: {
                name: userInfo.name,
                id: userInfo.id
            }
        });
    };

    //예매내역 이동
    function goReserve(){
        navigate('/myreserve', {
            state: {
                name: userInfo.name,
                id: userInfo.id
            }
        });
    };

    return (
        <>
            <MainHeader />
            <main className="myreserve-wrapper">

                <aside className="myreserve-menu">
                    <h3 className="menu-title">나의 무비로그</h3>

                    <ul className="menu-list">
                        <li onClick={goMyPage}>내 정보</li>
                        <li onClick={goMyInfoEdit}>개인정보 변경</li>
                        <li onClick={goReserve}>예매내역</li>
                    </ul>
                </aside>

                <div className="reserved-box">
                    <h2>나의 예매내역</h2>

                    {seatData.length === 0 ? (
                        <p className="empty">예매 내역이 없습니다.</p>
                    ) : (
                        <div className="reserve-list">
                            {seatData.map((item) => (
                                <div key={item.seat_id} className="reserve-card">

                                    <div className="reserve-header">
                                        <h3 className="reserve-title">{item.movie_name}</h3>
                                        <span className="reserve-num">예매번호 : 0{item.screen_num}-{item.seat_id * item.seat_id}</span>
                                    </div>

                                    <div className="reserve-body">
                                        <div className="reserve-row">
                                            <span className="label">상영관</span>
                                            <span className="value">{item.screen_num}관</span>
                                        </div>

                                        <div className="reserve-row seat-row">
                                            <span className="label">좌석</span>
                                            <span className="value seat-value">{item.seat_num.split(",").join(", ")}</span>
                                        </div>

                                        <div className="reserve-row">
                                            <span className="label">관람일시</span>
                                            <span className="value">{item.date.slice(0, 10)} {item.time}</span>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </main >
        </>
    )
}

export default MyReserve;