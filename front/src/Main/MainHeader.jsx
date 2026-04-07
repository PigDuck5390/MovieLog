import { useNavigate, useLocation } from 'react-router-dom'
import '../css/MainHeader.css'
import { useState, useEffect } from 'react'
import { API } from '../api.js'
import AuthModal from '../components/AuthModal.jsx'

function MainHeader() {

  const navigate = useNavigate()
  const [loggedInId, setLoggedInId] = useState(null);
  const [loggedInName, setLoggedInName] = useState(null);
  const { state: userInfo } = useLocation()
  const [point, setPoint] = useState(0);
  const [hide, setHide] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const nowY = window.scrollY;

      if (nowY > lastY) {
        setHide(true);
      } else {
        setHide(false);
      }
      lastY = nowY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (userInfo?.name) {
      setLoggedInId(userInfo.id)
      setLoggedInName(userInfo.name)
    }
  }, [userInfo])

  useEffect(() => {
    if (!userInfo?.id) return;
    fetch(`${API}/point/${userInfo.id}`)
      .then(res => res.json())
      .then(data => {
        setPoint(data);
      });
  }, [userInfo?.id]);

  function handleLoginSuccess(name, id) {
    setLoggedInName(name);
    setLoggedInId(id);
    navigate('/', { state: { name, id } });
  }

  function handleLogout() {
    setLoggedInId(null);
    setLoggedInName(null);
    alert("로그아웃 되었습니다")
    navigate('/', {
      state: {
        name: null,
        id: null
      }
    })

  }

  function mypage() {
    navigate('/mypage', {
      state: {
        name: userInfo?.name ?? loggedInName,
        id: userInfo?.id ?? loggedInId
      }
    })
  }

  function moveMain() {
    navigate("/", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveMovies() {
    navigate("/movies", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveReserv() {
    navigate("/reservation", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveBenefit() {
    navigate("/benefit", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveEvent() {
    navigate("/event", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveVip() {
    if (point >= 500) {
      navigate("/viplounge", {
        state: {
          name: userInfo?.name,
          id: userInfo?.id,
          point: point
        }
      });
    } else {
      alert("영화 더 보고 오세요!");
    }
  }
  function moveService() {
    navigate("/service", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }

  const headerRightContent = (loggedInName || userInfo?.name) ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      환영합니다. {loggedInName || userInfo?.name}님
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={mypage}>마이페이지</button>
    </div>
  ) : (
    <>
      <button onClick={() => { setAuthMode('login'); setShowAuth(true); }}>로그인</button>
      <button onClick={() => { setAuthMode('join'); setShowAuth(true); }}>회원가입</button>
    </>
  )

  return (
    <>
      {showAuth && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <header className={`header-wrapper ${hide ? "hide-header" : ""}`}>
        {/* 로그인/회원가입 라인 */}
        <div className="header-top">
          <div className="header-top-inner">
            <div className="header-top-left">
              <span onClick={moveVip}>VIP LOUNGE</span>
              <span onClick={moveService}>고객센터</span>
            </div>
            <div className="header-top-right">
              {headerRightContent}
            </div>
          </div>
        </div>

        {/* 중앙 로고 기준 좌/우 메뉴 */}
        <div className="header-main">
          <div className="header-main-inner">
            <nav className="nav-left">
              <a onClick={moveMovies} className="nav-item active">영화</a>
              <a onClick={moveReserv} className="nav-item">예매</a>
            </nav>

            <div className="header-logo" onClick={moveMain}>
              MOVIELOG
            </div>

            <nav className="nav-right">
              <a onClick={moveEvent} className="nav-item">이벤트</a>
              <a onClick={moveBenefit} className="nav-item">혜택</a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader
