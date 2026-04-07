import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import pen from "../img/pen.jpg";
import "../css/Login.css";
import { API } from '../api.js';

function Login() {
    const navigate = useNavigate();
    
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [userData, setUserData] = useState([]);

    //회원정보 조회
    useEffect(() => {
        fetch(`${API}/userinfo`)
            .then(response => response.json())
            .then(data => setUserData(data))
    }, []);

    //로그인 시도
    function handleLogin() {
        const login = userData.find(item =>
            item.id === id && item.pw === pw);
        
        //로그인 성공
        if(login) {
            alert("로그인에 성공했습니다");
            navigate('/', { state: 
                { name : login.name,
                    id : login.id
                 }
                }   
            );
        }else{
            alert("계정 정보가 없습니다");
        }
    }
    

    //-----------------------------------------------------//


    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className='login-title'>로그인</h1>
                <img src={pen} className="login-pen-icon" />

                <label className="login-label">아이디 :</label>
                <input
                    className="login-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyDown={(e)=>e.key == 'Enter' && handleLogin()}
                />

                <label className="login-label">비밀번호 :</label>
                <input
                    className="login-input"
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    onKeyDown={(e)=>e.key == 'Enter' && handleLogin()}
                />

                <Link to="/join" className="login-join-link">
                    회원가입
                </Link>

                <button className="login-submit-btn"
                onClick={handleLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
}

export default Login;
