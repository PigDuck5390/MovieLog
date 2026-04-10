import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainHeader from "../Main/MainHeader";
import "../css/VipLounge.css";
import defaultProfile from "../img/기본프로필.png";
import { API } from '../api.js';

function VipLounge() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const userName = state?.name;
    const userId = state?.id;
    const userPoint = state?.point ?? 0;

    const [profileImg, setProfileImg] = useState(defaultProfile);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [zoomImg, setZoomImg] = useState(null);

    const wsRef = useRef(null);
    const chatBoxRef = useRef(null);
    const isImageUrl = (text) =>
        typeof text === "string" &&
        /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(text);


    useEffect(() => {
        if (!userName || !userId) {
            alert("로그인이 필요합니다.");
            navigate("/");
            return;
        }

        if (userPoint < 500) {
            alert("VIP 라운지는 포인트 500점 이상부터 이용 가능합니다.");
            navigate("/mypage", { state });
        }
    }, [userName, userId, userPoint]);

    useEffect(() => {
        fetch(`${API}/userprofile/${userId}`)
            .then(res => res.json())
            .then(data => {
                const profile = Array.isArray(data) && data.length > 0 ? data[0].profile : null;
                if (profile) {
                    setProfileImg(`${API}${profile}`);
                }
            });
    }, [userId]);

    useEffect(() => {
        const host = window.location.hostname;
        const wsUrl = host.startsWith("192.168") || host === "localhost"
            ? "ws://192.168.0.228:3001"
            : "ws://112.218.47.101:3001";

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const json = JSON.parse(event.data);
                setMessages(prev => [...prev, json]);
            } catch {
                console.log("일반 메세지:", event.data);
            }
        };

        ws.onerror = () => {
            console.log("WebSocket 연결 오류");
        };

        return () => ws.close();
    }, []);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            alert("채팅 서버에 연결 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        const msg = {
            sender: userName,
            userId: userId,
            profile: profileImg,
            message: trimmed,
            time: new Date().toLocaleTimeString()
        };

        wsRef.current.send(JSON.stringify(msg));
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <>
            <MainHeader />
            <main className="vip-wrapper">
                {/* 좌측 정보 */}
                <aside className="vip-side">
                    <h2 className="vip-title">VIP Lounge</h2>

                    <div className="vip-user-box">
                        <img src={profileImg} className="vip-profile-img" alt="프로필" />
                        <div>
                            <p className="vip-user-name">{userName}님</p>
                            <p className="vip-user-point">보유 포인트 : {userPoint} P</p>
                        </div>
                    </div>
                    <button
                        className="vip-back-btn"
                        onClick={() =>
                            navigate("/mypage", {
                                state: { name: userName, id: userId }
                            })
                        }
                    >
                        ← 마이페이지로 돌아가기
                    </button>
                </aside>

                {/* 채팅 영역 */}
                <section className="vip-chat-section">
                    <div className="vip-chat-box" ref={chatBoxRef}>
                        {messages.map((m, idx) => {
                            const isMine = m.userId === userId;

                            return (
                                <div
                                    key={idx}
                                    className={`chat-msg-row ${isMine ? "mine" : "other"}`}
                                >

                                    {!isMine && (
                                        <img
                                            src={m.profile || defaultProfile}
                                            className="chat-profile-img"
                                            alt="프사"
                                            onClick={() => setZoomImg(m.profile || defaultProfile)}
                                        />
                                    )}

                                    <div className={`chat-bubble ${isMine ? "my-bubble" : ""}`}>
                                        <div className="chat-name">{m.sender}</div>

                                        {!isImageUrl(m.message) && <div className="chat-text">{m.message}</div>}
                                        <div className="chat-time">{m.time}</div>
                                        {isImageUrl(m.message) && (
                                            <img src={m.message} className="chat-img" />
                                        )}
                                    </div>

                                    {isMine && (
                                        <img
                                            src={m.profile || defaultProfile}
                                            className="chat-profile-img"
                                            alt="프사"
                                            onClick={() => setZoomImg(m.profile || defaultProfile)}
                                        />
                                    )}

                                </div>
                            );
                        })}

                    </div>

                    <div className="vip-input-row">
                        <textarea
                            className="vip-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="vip-send-btn" onClick={handleSend}>
                            전송
                        </button>
                    </div>
                </section>
                {zoomImg && (
                    <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
                        <img src={zoomImg} className="zoom-image" />
                    </div>
                )}

            </main>
        </>
    );
}

export default VipLounge;
