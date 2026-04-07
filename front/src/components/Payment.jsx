import MainHeader from '../Main/MainHeader.jsx'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "../css/Payment.css";
import { API } from '../api.js';

function Payment() {
    const { state: userInfo } = useLocation();
    const reservInfo = useParams();
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    console.log(reservInfo)
    
    useEffect(() => {
        fetch(`${API}/cardinfo/${userInfo.id}`)
            .then(res => res.json())
            .then(data => setCardData(data));
    }, []);

    const seatList = reservInfo.seats.split(",");
    const seatCount = seatList.length;

    function submit() {
        if (cardData.length === 0) {
            alert("카드를 등록해주세요.");
            navigate("/myinfo", {
                state: { name: userInfo.name, id: userInfo.id }
            });
            return;
        }

        if (!selectedCard) {
            alert("결제 카드를 선택해주세요!");
            return;
        }

        
        const selectedCardInfo = cardData.find(
            (item) => String(item.card_defid) === selectedCard
        );

        fetch(`${API}/reservcount`, {
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                movieId: reservInfo.movieId,
                addCount: seatCount 
            })
        }
        )

        fetch(`${API}/reserv`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                date: reservInfo.date,
                movieName: reservInfo.title,
                movieTime: reservInfo.time,
                userName: userInfo.name,
                userId: userInfo.id,
                seat: reservInfo.seats,
                screen: reservInfo.screen,
                pickcount: seatCount,
                cardNumber: selectedCardInfo.card_num,
                cardBank: selectedCardInfo.card_bank,
                cardDate: selectedCardInfo.card_date
            })
        })
            .then(() => {
                return fetch(`${API}/point/add/${userInfo.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ addPoint: seatCount * 10 })
                });
            })
            .then(res => res.json())
            .then(() => {
                alert("결제에 성공했습니다. 마이페이지에서 내역확인이 가능합니다.");
                navigate("/", {
                    state: { name: userInfo.name, id: userInfo.id }
                });
            });

        
}

    return (
        <>
            <MainHeader />

            <div className="payment-container">
                <h1>결제 정보</h1>

                <div className="pay-box">
                    <p>영화 제목: {reservInfo.title}</p>
                    <p>상영 날짜: {reservInfo.date}</p>
                    <p>상영 시간: {reservInfo.time}</p>
                    <p>상영관: {reservInfo.screen}관</p>
                    <p>좌석: {seatList.join(", ")}</p>
                    <p>좌석 개수: {seatCount}개</p>
                    <p>총 결제 금액: {seatCount * 10000} 원</p>
                </div>

                <section className="payment-section">
                    <h2 className="paycard-title">결제 카드 선택</h2>

                    <div className="paycard-list">
                        {cardData
                            .filter(item => item.user_id == userInfo.id)
                            .map((item) => (
                                <div
                                    className={`paycard-item ${selectedCard === String(item.card_defid) ? "selected-card" : ""
                                        }`}
                                    key={item.card_defid}
                                    onClick={() => setSelectedCard(String(item.card_defid))}
                                >
                                    <div className="paycard-info">
                                        <span>카드사 : {item.card_bank}</span><br />
                                        <span>카드 번호 : {item.card_num}</span><br />
                                        <span>만료일 : {item.card_date}</span><br />
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                <button className="pay-btn" onClick={() => {
                    console.log("버튼 클릭됨");
                    submit();
                }}>
                    결제하기
                </button>
            </div>
        </>
    );
}

export default Payment;
