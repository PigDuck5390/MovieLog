import ManagementHead from '../ManagementHead.jsx'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { API } from '../../api.js'


function ManageMovies() {

    const [movieData, setMovieData] = useState([])
    const [newMovieData, setNewMovieData] = useState({})

    const navigate = useNavigate();
    
    // infinite re-render 수정: [] 사용
    useEffect(() => {
        fetch(`${API}/movies`)
            .then(response => response.json())
            .then(data => setMovieData(data))
    }, [])

    function edit(id, item, itemKey) {
        const newData = prompt("수정할 내용을 입력해주세요.", item)
        if (!newData) {
            alert("내용이 입력되지 않았습니다.")
            return
        }
        fetch(`${API}/movies/update`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                movieId: id,
                field: itemKey,
                newData: newData
            })
        }).then(() => window.location.reload())
    }

    function handlePosterChange(e, movieId) {
        const file = e.target.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append('poster', file)
        formData.append('movieId', movieId)
        fetch(`${API}/movies/updateposter`, {
            method: 'PUT',
            body: formData
        }).then(res => res.json())
          .then(() => {
              alert('포스터가 변경되었습니다.')
              window.location.reload()
          })
    }

    function del(id) {
        const confirm = window.confirm("정말로 삭제하시겠습니까?")
        if (confirm) {
            fetch(`${API}/movies/delete`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    movieId: id
                })
            }).then(() => window.location.reload())
        }
    }

    function add() {
        const formData = new FormData();
        for (const key in newMovieData) {
            formData.append(key, newMovieData[key])
        }
        fetch(`${API}/movies/add`, {
            method: "POST",
            body: formData
        })
        alert("영화가 추가되었습니다.")
        setNewMovieData({})
        window.location.reload();
    }

    return (
        <div className="admin-page admin-movies-page">
            <ManagementHead />

            <main className="admin-main">
                <h1 className="admin-title">영화 관리</h1>
                <hr className="admin-divider" />

                <section className="admin-section admin-section--form">
                    <h2 className="admin-subtitle">영화 추가</h2>

                    <div className="admin-form admin-form--columns">
                        <div className="admin-form-column">
                            <div className="admin-form-row">
                                <label className="admin-label">상영관</label>
                                <input
                                    className="admin-input"
                                    type="number"
                                    placeholder='관 없이 숫자만 입력 ex) 1'
                                    value={newMovieData.screen_number || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            screen_number: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">영화 제목</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='영화 제목'
                                    value={newMovieData.title || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            title: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">영화 설명</label>
                                <textarea
                                    className="admin-textarea"
                                    type="text"
                                    placeholder='영화 설명'
                                    value={newMovieData.description || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            description: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">짧은 설명</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='짧은 설명'
                                    value={newMovieData.short_description || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            short_description: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">포스터</label>
                                <input
                                    className="admin-file"
                                    type="file"
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            poster: e.target.files[0]
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">러닝타임</label>
                                <input
                                    className="admin-input"
                                    type="number"
                                    placeholder='분 없이 숫자만 입력 ex) 120'
                                    value={newMovieData.runtime || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            runtime: e.target.value
                                        })}
                                />
                            </div>
                        </div>

                        <div className="admin-form-column admin-form-column--times">
                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 1</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time1 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time1: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 2</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time2 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time2: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 3</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time3 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time3: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 4</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time4 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time4: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 5</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time5 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time5: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 6</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time6 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time6: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 7</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time7 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time7: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 8</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time8 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time8: e.target.value
                                        })}
                                />
                            </div>

                            <div className="admin-form-row">
                                <label className="admin-label">상영 시간 9</label>
                                <input
                                    className="admin-input"
                                    type="text"
                                    placeholder='00:00'
                                    value={newMovieData.start_time9 || ''}
                                    onChange={(e) => setNewMovieData(
                                        {
                                            ...newMovieData,
                                            start_time9: e.target.value
                                        })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        className="admin-button admin-button--primary admin-add-button"
                        onClick={add}
                    >
                        영화 추가
                    </button>
                </section>

                <hr className="admin-divider" />

                <section className="admin-section admin-section--list">
                    <h2 className="admin-subtitle">영화 수정 및 삭제</h2>

                    <div className="admin-grid admin-grid--movies">
                        {movieData.map((item) =>
                            <div className="admin-card admin-card--movie" key={item.movie_id}>
                                <div className="admin-card-header">
                                    <span className="admin-card-title">
                                        제목 : {item.title}
                                    </span>
                                    <button
                                        className="admin-button admin-button--small"
                                        onClick={(e) => edit(
                                            item.movie_id, item.title, "title")}
                                    >
                                        제목 수정
                                    </button>
                                    <button
                                        className="admin-button admin-button--danger admin-button--small"
                                        onClick={(e) => del(item.movie_id)}
                                    >
                                        삭제
                                    </button>
                                </div>

                                <div className="admin-card-body">
                                    <p className="admin-text">
                                        상영관 : {item.screen_number}관
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => edit(
                                                item.movie_id, item.screen_number, "screen_number")}
                                        >
                                            상영관 수정
                                        </button>
                                    </p>

                                    <p className="admin-text">
                                        설명 : {item.description}
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => edit(
                                                item.movie_id, item.description, "description")}
                                        >
                                            설명 수정
                                        </button>
                                    </p>

                                    <p className="admin-text">
                                        짧은 설명 : {item.short_description}
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => edit(
                                                item.movie_id, item.short_description, "short_description")}
                                        >
                                            짧은 설명 수정
                                        </button>
                                    </p>

                                    <div className="admin-movie-poster-wrap">
                                        <span className="admin-label-inline">포스터</span>
                                        <img
                                            className="admin-movie-poster"
                                            src={`${API}${item.poster}`}
                                            alt={`${item.title} 포스터`}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id={`poster-input-${item.movie_id}`}
                                            style={{ display: 'none' }}
                                            onChange={(e) => handlePosterChange(e, item.movie_id)}
                                        />
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={() => document.getElementById(`poster-input-${item.movie_id}`).click()}
                                        >
                                            포스터 수정
                                        </button>
                                    </div>

                                    <div className="admin-movie-times">
                                        <p className="admin-text">
                                            상영 시간 1 : {item.start_time1}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time1, "start_time1")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 2 : {item.start_time2}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time2, "start_time2")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 3 : {item.start_time3}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time3, "start_time3")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 4 : {item.start_time4}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time4, "start_time4")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 5 : {item.start_time5}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time5, "start_time5")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 6 : {item.start_time6}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time6, "start_time6")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 7 : {item.start_time7}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time7, "start_time7")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 8 : {item.start_time8}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time8, "start_time8")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                        <p className="admin-text">
                                            상영 시간 9 : {item.start_time9}
                                            <button
                                                className="admin-button admin-button--tiny"
                                                onClick={(e) => edit(
                                                    item.movie_id, item.start_time9, "start_time9")}
                                            >
                                                수정
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ManageMovies
