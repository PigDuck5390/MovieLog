import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pen from "../img/pen.jpg";
import "../css/Join.css";
import { API } from '../api.js';

function Join() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [checkPw, setCheckPw] = useState("");
    const [userData, setUserData] = useState([]);

    //회원정보 조회
    useEffect(() => {
        fetch(`${API}/userinfo`)
            .then(response => response.json())
            .then(data => setUserData(data));
    }, []);

    //회원가입 시도
    function handleJoin() {
        if (id !== "" && pw !== "" && name !== "") {
            if (!userData.some(item => item.id === id)) {
                if (pw === checkPw) {
                    //회원가입 실행
                    fetch(`${API}/join`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userName: name,
                            userId: id,
                            userPw: pw
                        })
                    });
                    alert("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.");
                    navigate("/login");
                }else{
                    alert("비밀번호 확인이 다릅니다.");
                }
            }else{
                alert("중복된 아이디입니다.");
            }
        }else{
            alert("입력하지 않은 정보가 있습니다.");
        }
    }


    // ------------------------------------------------//


    return (
        <div className="join-page">
            <div className="join-container">
                <h1 className='join-title'>회원가입</h1>
                <img src={pen} className="join-pen-icon" alt="pen" />

                <label className="join-label">이름 :</label>
                <input
                    type="text"
                    className="join-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e)=>e.key == "Enter" && handleJoin()}
                />

                <label className="join-label">아이디 :</label>
                <input
                    type="text"
                    className="join-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyDown={(e)=>e.key == "Enter" && handleJoin()}
                />

                <label className="join-label">비밀번호 :</label>
                <input
                    type="password"
                    className="join-input"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    onKeyDown={(e)=>e.key == "Enter" && handleJoin()}
                />

                <label className="join-label">비밀번호 확인 :</label>
                <input
                    type="password"
                    className="join-input"
                    value={checkPw}
                    onChange={(e) => setCheckPw(e.target.value)}
                    onKeyDown={(e)=>e.key == "Enter" && handleJoin()}
                />
                
                <Link to="/login"className="join-link">
                로그인 화면으로 이동
                </Link>

                <button className="join-submit-btn" 
                onClick={handleJoin}>
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Join;
