import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import pen from "../img/pen.jpg"
import { API } from '../api.js'
import '../css/AuthModal.css'

function AuthModal({ initialMode = 'login', onClose, onLoginSuccess }) {
    const navigate = useNavigate()
    const [mode, setMode] = useState(initialMode)

    // login state
    const [loginId, setLoginId] = useState("")
    const [loginPw, setLoginPw] = useState("")

    // join state
    const [name, setName] = useState("")
    const [joinId, setJoinId] = useState("")
    const [joinPw, setJoinPw] = useState("")
    const [checkPw, setCheckPw] = useState("")

    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`${API}/userinfo`)
            .then(r => r.json())
            .then(data => setUserData(data))
    }, [])

    function handleLogin() {
        const login = userData.find(item => item.id === loginId && item.pw === loginPw)
        if (login) {
            alert("로그인에 성공했습니다")
            onLoginSuccess(login.name, login.id)
            onClose()
        } else {
            alert("계정 정보가 없습니다")
        }
    }

    function handleJoin() {
        if (!name || !joinId || !joinPw) {
            alert("입력하지 않은 정보가 있습니다.")
            return
        }
        if (userData.some(item => item.id === joinId)) {
            alert("중복된 아이디입니다.")
            return
        }
        if (joinPw !== checkPw) {
            alert("비밀번호 확인이 다릅니다.")
            return
        }
        fetch(`${API}/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: name, userId: joinId, userPw: joinPw })
        }).then(() => {
            alert("회원가입이 완료되었습니다. 로그인 해주세요.")
            setMode('login')
            setName(""); setJoinId(""); setJoinPw(""); setCheckPw("")
        })
    }

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div className="auth-backdrop" onClick={handleBackdropClick}>
            <div className="auth-modal">
                <button className="auth-close-btn" onClick={onClose}>✕</button>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => setMode('login')}
                    >
                        로그인
                    </button>
                    <button
                        className={`auth-tab ${mode === 'join' ? 'active' : ''}`}
                        onClick={() => setMode('join')}
                    >
                        회원가입
                    </button>
                </div>

                <img src={pen} className="auth-pen-icon" alt="pen" />

                {mode === 'login' ? (
                    <div className="auth-form">
                        <h2 className="auth-title">로그인</h2>
                        <label className="auth-label">아이디</label>
                        <input
                            className="auth-input"
                            value={loginId}
                            onChange={e => setLoginId(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            placeholder="아이디 입력"
                        />
                        <label className="auth-label">비밀번호</label>
                        <input
                            className="auth-input"
                            type="password"
                            value={loginPw}
                            onChange={e => setLoginPw(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            placeholder="비밀번호 입력"
                        />
                        <button className="auth-submit-btn" onClick={handleLogin}>로그인</button>
                        <p className="auth-switch">
                            계정이 없으신가요?{' '}
                            <span onClick={() => setMode('join')}>회원가입</span>
                        </p>
                    </div>
                ) : (
                    <div className="auth-form">
                        <h2 className="auth-title">회원가입</h2>
                        <label className="auth-label">이름</label>
                        <input
                            className="auth-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleJoin()}
                            placeholder="이름 입력"
                        />
                        <label className="auth-label">아이디</label>
                        <input
                            className="auth-input"
                            value={joinId}
                            onChange={e => setJoinId(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleJoin()}
                            placeholder="아이디 입력"
                        />
                        <label className="auth-label">비밀번호</label>
                        <input
                            className="auth-input"
                            type="password"
                            value={joinPw}
                            onChange={e => setJoinPw(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleJoin()}
                            placeholder="비밀번호 입력"
                        />
                        <label className="auth-label">비밀번호 확인</label>
                        <input
                            className="auth-input"
                            type="password"
                            value={checkPw}
                            onChange={e => setCheckPw(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleJoin()}
                            placeholder="비밀번호 확인"
                        />
                        <button className="auth-submit-btn" onClick={handleJoin}>회원가입</button>
                        <p className="auth-switch">
                            이미 계정이 있으신가요?{' '}
                            <span onClick={() => setMode('login')}>로그인</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthModal
