import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/Main.css'
import { API } from '../api.js'

import cgv from '../img/cgv 소형 아이콘.png'
import lotte from '../img/롯데시네마 소형아이콘.png'
import megabox from '../img/메가박스 소형 아이콘.png'

import ad from '../../../back/upload/video/아바타 예고편.mp4'


const FALLBACK_IMG_INNER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI3MCIgZmlsbD0iIzhBNjEzMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZmlsbD0iI2ZkZjBkNCI+UE9TVEVSPC90ZXh0Pjwvc3ZnPg=='

function MovieEntry({ movie, rank, onReserve }) {
  if (!movie) return null
  return (
    <div className="movie-row">
      <div className="poster-wrap">
        <img
          src={`${API}${movie.poster}`}
          alt={movie.title}
          className="poster-img"
          onError={e => { e.currentTarget.src = FALLBACK_IMG_INNER }}
        />
        <div className="rank-badge">{rank}위</div>
      </div>
      <div className="desc">
        <h1>{movie.title}</h1>
        <span>{movie.short_description}</span>
        <button className="quick-reserv" onClick={() => onReserve(movie.movie_id)}>
          바로 예매하기
        </button>
      </div>
    </div>
  )
}

function Main() {
  const navigate = useNavigate()
  const { state: userInfo } = useLocation()
  const [movieData, setMovieData] = useState([])
  const [page, setPage] = useState(0)
  const [showAd, setShowAd] = useState(false)

  // 두 단계 페이지 플립 상태
  // dir: 'next' | 'prev' | null
  // phase: 'out' | 'in' | null
  const [flipState, setFlipState] = useState({ dir: null, phase: null })
  const flipBusyRef = useRef(false)

  useEffect(() => {
    fetch(`${API}/movieinfo`)
      .then(response => response.json())
      .then(data => setMovieData(data))
  }, [])

  useEffect(() => {
    const lastClosed = localStorage.getItem('adClosedAt')
    if (!lastClosed) { setShowAd(true); return }
    if (Date.now() - Number(lastClosed) > 60 * 60 * 1000) setShowAd(true)
  }, [])

  // 페이지별 4개씩
  const pageSize = 4
  const startIndex = page * pageSize
  const pageMovies = movieData.slice(startIndex, startIndex + pageSize)

  const leftTop    = pageMovies[0]
  const leftBottom = pageMovies[2]
  const rightTop   = pageMovies[1]
  const rightBottom = pageMovies[3]

  const maxPage = Math.max(0, Math.ceil(movieData.length / pageSize) - 1)

  // 두 단계 플립 애니메이션 (22ms out + 22ms in = 빠른 책 넘김)
  function changePage(dir) {
    if (flipBusyRef.current) return
    flipBusyRef.current = true

    // 1단계: 해당 페이지 접힘 (out) + 반대 페이지 그림자
    setFlipState({ dir, phase: 'out' })

    setTimeout(() => {
      // 컨텐츠 교체
      setPage(prev => dir === 'next' ? prev + 1 : prev - 1)
      // 2단계: 새 페이지 펼쳐짐 (in)
      setFlipState({ dir, phase: 'in' })

      setTimeout(() => {
        setFlipState({ dir: null, phase: null })
        flipBusyRef.current = false
      }, 260)
    }, 220)
  }

  // 플립 클래스 계산 (넘기는 쪽 / 그림자 받는 쪽)
  const rightPageClass =
    flipState.dir === 'next'
      ? (flipState.phase === 'out' ? 'flip-out' : flipState.phase === 'in' ? 'flip-in' : '')
      : ''

  const leftPageClass =
    flipState.dir === 'prev'
      ? (flipState.phase === 'out' ? 'flip-out' : flipState.phase === 'in' ? 'flip-in' : '')
      : ''

  const Reserve = (movie_id) => {
    navigate('/reservation', {
      state: { movieId: movie_id, name: userInfo?.name, id: userInfo?.id }
    })
  }

  function closeAd() {
    localStorage.setItem('adClosedAt', Date.now())
    setShowAd(false)
  }

  return (
    <>
      <MainHeader />
      <main className="main-area">

        {/* 광고 모달 */}
        {showAd && (
          <div className="ad-modal">
            <div className="ad-content">
              <video src={ad} autoPlay muted loop className="ad-video" />
              <button className="ad-close-btn" onClick={closeAd}>close ad</button>
            </div>
          </div>
        )}

        <div className="book-wrapper">
          <div className="open-book">
            <div className="book-spine" />

            {/* ===== 왼쪽 페이지 ===== */}
            <div className={`page page-left ${leftPageClass}`}>
              <MovieEntry movie={leftTop}    rank={startIndex + 1} onReserve={Reserve} />
              <MovieEntry movie={leftBottom} rank={startIndex + 3} onReserve={Reserve} />
            </div>

            {/* ===== 오른쪽 페이지 ===== */}
            <div className={`page page-right ${rightPageClass}`}>
              <MovieEntry movie={rightTop}    rank={startIndex + 2} onReserve={Reserve} />
              <MovieEntry movie={rightBottom} rank={startIndex + 4} onReserve={Reserve} />
            </div>
          </div>

          {/* 페이지 넘김 버튼 — 책 중앙 좌우 */}
          <button
            className={`page-arrow page-prev ${page === 0 ? 'disabled' : ''}`}
            onClick={() => page > 0 && changePage('prev')}
            aria-label="이전 페이지"
          />
          <button
            className={`page-arrow page-next ${page === maxPage ? 'disabled' : ''}`}
            onClick={() => page < maxPage && changePage('next')}
            aria-label="다음 페이지"
          />
        </div>

        {/* 협력사 */}
        <div className="cinema-wrapper">
          <span className="cinema-label">협력사 : </span>
          <img src={cgv}    className="cinema-icon" onClick={() => window.location.href = 'https://cgv.co.kr/'} alt="CGV" />
          <img src={lotte}  className="cinema-icon" onClick={() => window.location.href = 'https://www.lottecinema.co.kr/NLCHS'} alt="롯데시네마" />
          <img src={megabox} className="cinema-icon" onClick={() => window.location.href = 'https://www.megabox.co.kr/'} alt="메가박스" />
        </div>

      </main>
    </>
  )
}

export default Main
