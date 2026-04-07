import MainHeader from "../Main/MainHeader";
import { useState, useEffect, useRef } from "react";
import "../css/Movies.css";
import { API } from '../api.js';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");

  // 각 영화 section을 참조할 객체
  const movieRefs = useRef({});

  // 영화 리스트 불러오기
  useEffect(() => {
    fetch(`${API}/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  // 영화 정보 불러오기
  useEffect(() => {
    fetch(`${API}/movieinfo`)
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  }, []);

  // 검색해서 스크롤 이동
  const handleSearch = () => {
    if (!search.trim()) return;

    // 검색어와 영화 제목 대조
    const foundMovie = movies.find((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );

    if (foundMovie) {
      const movieId = foundMovie.movie_id;
      const targetRef = movieRefs.current[movieId];

      if (targetRef) {
        targetRef.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      alert("검색한 영화가 목록에 없습니다.");
    }
  };

  return (
    <>
      <MainHeader />

      {/* 검색창 영역 */}
      <div className="movie-search-box">
        <input
          type="text"
          placeholder="영화 제목 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <main className="movies-area">
        {movies.map((movie) => (
          <section
            key={movie.movie_id}
            className="movie-section"
            ref={(el) => (movieRefs.current[movie.movie_id] = el)}
          >
            <div className="movie-poster-box">
              <img
                src={`${API}${movie.poster}`}
                alt={movie.title}
              />
            </div>

            <div className="movie-info-box">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-desc">{movie.description}</p>
              <p className="movie-meta">러닝타임 : {movie.runtime}분</p>

              <div className="movie-extra-box">
                <p className="movie-meta">예매누적수 : 
                  {movie.reserv_count}명</p>
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default Movies;
