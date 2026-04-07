import AdminHead from './AdminHead.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Admin.css'
import { API } from '../api.js'

function Admin() {
    const navigate = useNavigate()

    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [adminData, setAdminData] = useState([])

    useEffect(() => {
        fetch(`${API}/admin`)
            .then(response => response.json())
            .then(data => setAdminData(data))
    }, [])

    function login() {
        const login = adminData.find(item =>
            item.admin_id == id && item.admin_pw == pw
        )
        if (login) {
            alert("로그인 되었습니다.")
            navigate('/admin/management', { state: id })
        } else {
            alert(
                "경고 : 관리자 정보가 존재하지 않습니다. 관리자 외에 접근할 수 없습니다")
        }

    }

    return (
        <div className="admin-page admin-login-page">
            <AdminHead />

            <div className="admin-main">
                <div className="admin-login-card">
                    <h2 className="admin-title">관리자 로그인</h2>

                    <div className="admin-form">
                        <div className="admin-form-row">
                            <label className="admin-label">아이디</label>
                            <input
                                className="admin-input"
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>

                        <div className="admin-form-row">
                            <label className="admin-label">비밀번호</label>
                            <input
                                className="admin-input"
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </div>

                        <button
                            className="admin-button admin-button--primary admin-login-button"
                            onClick={login}
                        >
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
