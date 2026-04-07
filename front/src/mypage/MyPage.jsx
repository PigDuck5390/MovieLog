import MainHeader from "../Main/MainHeader";
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import defaultProfile from "../img/기본프로필.png";
import { FaCrown } from "react-icons/fa";
import "../css/MyPage.css";
import { API } from '../api.js';

function MyPage() {
    const navigate = useNavigate();

    const { state : userInfo } = useLocation();
    const [loggedInName, setLoggedInName] = useState(null);
    const [profileImg, setProfileImg] = useState(defaultProfile);
    const [seatData, setSeatData] = useState([]);
    const [point, setPoint] = useState(0);

    //해당 유저 프로필 사진 조회
    useEffect(() => {
        setLoggedInName(userInfo.name);

        fetch(`${API}/userprofile/${userInfo.id}`)
            .then(res => res.json())
            .then(data => {
                const profilePath = Array.isArray(data) && data.length > 0
                    ? data[0].profile : null;
                if (profilePath) {
                    setProfileImg(`${API}${profilePath}`);
                }
            });
    }, []);

    //예매 내역 조회
    useEffect(() => {
        fetch(`${API}/seatlist/${userInfo.id}`)
            .then(res => res.json())
            .then(data => setSeatData(data))
    }, []);

    //포인트 
    useEffect(() => {
        fetch(`${API}/point/${userInfo.id}`, {
        })
            .then(res => res.json())
            .then(data => setPoint(data));
    }, []);

    //포인트별 등급
    function movieRank() {
        if (point >= 1000) {
            return "영화 그 자체";
        } else if (point >= 500) {
            return "영화에 미친자";
        } else if (point >= 100) {
            return "영화 중수";
        } else if (point > 0) {
            return "영화 입문자";
        } else {
            return "등급 없음";
        }
    }

    //프로필 사진 변경
    async function handleProfileChange(e){
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile", file);
        formData.append("userId", userInfo.id);

        const res = await fetch(`${API}/updateProfile`, {
            method: "PUT",
            body: formData
                }
            );

        const data = await res.json();

        if (data.success) {
            setProfileImg(`${API}${data.profile}`);
        } else {
            alert("업로드 실패");
        }
    }

    //개인정보 변경 이동
    function goMyInfoEdit() {
        navigate('/myinfo', { state: { name: userInfo.name, id: userInfo.id } });
    }

    //예매내역 이동
    function goReserve(){
        navigate('/myreserve', {
            state: {
                name: userInfo.name,
                id: userInfo.id
            }
        });
    }
    
    return (
        <>
            <MainHeader />

            <main className="mypage-wrapper">

                <aside className="mypage-menu">
                    <h3 className="menu-title">나의 무비로그</h3>

                    <ul className="menu-list">
                        <li>내 정보</li>
                        <li onClick={goMyInfoEdit}>개인정보 변경</li>
                        <li onClick={goReserve}>예매내역</li>
                    </ul>
                </aside>

                <section className="mypage-content">
                    <div className="profile-box">

                        <div className="level-top-box">
                            <div className="level-badge">
                                <FaCrown className="level-icon" />
                                <span className="level-name">{movieRank()}</span>
                            </div>
                        </div>

                        <div className="profile-left">
                            <label htmlFor="profileInput" style={{ cursor: 'pointer', display: 'block' }}>
                                <img
                                    src={profileImg}
                                    alt="프로필"
                                    className="profile-img"
                                />
                            </label>
                            <input
                                type="file"
                                id="profileInput"
                                accept="image/*"
                                onChange={handleProfileChange}
                                style={{ display: "none" }}
                            />
                        </div>

                        <div className="profile-right">
                            <h1 className="welcome-text">
                                안녕하세요! <br />{loggedInName}님
                            </h1>

                            <div className="point-box">
                                <span className="point-label">현재 포인트</span>
                                <span className="point-value">{point} P</span>
                            </div>
                        </div>

                    </div>

                    <div className="history-box">
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
                                                <span className="value seat-value">
                                                    {item.seat_num.split(",").join(", ")}</span>
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
                </section>
            </main>
        </>
    );
}

export default MyPage;
