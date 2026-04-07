import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import '../css/Seat.css'
import { API } from '../api.js'

function Seat() {
  const navigate = useNavigate()

  const { state: userInfo } = useLocation()
  const reservInfo = useParams()
  const [seatFilter, setSeatFilter] = useState([])
  const [reservedSeats, setReservedSeats] = useState([])
  const [personnel, setPersonnel] = useState(0)
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seats =
    ["A1", "A2", "A3", "A4", "A5", "A6",
      "B1", "B2", "B3", "B4", "B5", "B6",
      "C1", "C2", "C3", "C4", "C5", "C6",
      "D1", "D2", "D3", "D4", "D5", "D6",
      "E1", "E2", "E3", "E4", "E5", "E6",
      "F1", "F2", "F3", "F4", "F5", "F6",
    ]

  const [seatData, setSeatData] = useState([])

  useEffect(() => { //예매정보 조회
    fetch(`${API}/seatlist`)
      .then(response => response.json())
      .then(data => setSeatData(data))
  }, []);

  useEffect(() => {
    const seatNums = seatData.filter(item =>
      item.movie_name == reservInfo.title &&
      item.screen_num == reservInfo.screen &&
      item.date.split('T')[0] == reservInfo.date.split('T')[0] &&
      item.time == reservInfo.time
    )
      .flatMap(item =>
        item.seat_num.includes(',')
          ? item.seat_num.split(',')
          : [item.seat_num]
      )
    setReservedSeats(seatNums)
    console.log(seatNums)
  }, [seatData])


  const toggleSeat = (seat) => { //자리선택 뻥션

    if (reservedSeats.includes(seat)) {
      alert("이미 예매된 좌석입니다.");
      return;
    }
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
      console.log(selectedSeats.length)
    } else if (selectedSeats.length < personnel) {
      setSelectedSeats([...selectedSeats, seat]);
      console.log(selectedSeats.length)
      console.log(personnel)
    } else {
      alert("선택한 인원수보다 선택한 좌석이 많습니다")
    }
  };

  function submit() { //예매 뻥션
    if (!selectedSeats[0]) {
      alert("좌석을 선택해주세요.")
      return;
    }

    const payment = confirm("결제 페이지로 이동하시겠습니까?")

    if (payment) {
      navigate(
        `/payment/${reservInfo.title}/${reservInfo.time}/${reservInfo.date}/${reservInfo.screen}/${selectedSeats}/${reservInfo.movieId}`,
        {
          state: {
            name: userInfo.name,
            id: userInfo.id
          }
        })
    }
  }

  function personCount() {
    if (personnel >= seats.length - reservedSeats.length) {
      alert("인원수가 잔여석을 초과할 수 없습니다.")
      return;
    }
    setPersonnel(item => item += 1)
  }

  function personDecount() {
    if (personnel <= 0) {
      alert("인원수가 0보다 작을 수 없습니다.")
      return;
    }
    if (selectedSeats < personnel) {
      setPersonnel(item => item -= 1)
    } else {
      alert("먼저 좌석 선택을 취소해주세요.")
    }
  }


  return (
    <>
      <MainHeader />


      <div className="seat-wrapper">

        {/* 좌측 영역 */}
        <div className="left-area">
          <h1 className='screen'>{reservInfo.screen}관 : SCREEN</h1>
          <div className="seat-container">
            {seats.map(seat => {
              const isSelected = selectedSeats.includes(seat);
              const isReserved = reservedSeats.includes(seat);

              return (
                <div
                  key={seat}
                  className={`seat
                    ${isSelected ? "selected" : ""}
                    ${isReserved ? "reserved" : ""}`
                  }
                  onClick={() => {
                    if (!isReserved) toggleSeat(seat)
                  }}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        </div>


        {/* 우측 영역 */}
        <div className="right-area">
          <div className="movie-info">
            <p><strong>상영관 :</strong> {reservInfo.screen}관</p>
            <p><strong>영화 제목 :</strong> {reservInfo.title}</p>
            <p><strong>날짜 :</strong> {reservInfo.date}</p>
            <p><strong>시간 :</strong> {reservInfo.time}</p>
          </div>
          <div className='person-row'>
            <button className='count-btn' onClick={personDecount}>-</button>
            <span>인원수 : {personnel}</span>
            <button className='count-btn' onClick={personCount}>+</button>
          </div>


          <button className="reserve-btn" onClick={submit}>예매하기</button>
        </div>

      </div>

    </>
  )
}

export default Seat