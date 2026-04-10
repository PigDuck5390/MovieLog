# 🎬 MOVIELOG

> 영화 예매 웹 서비스 — 팀 프로젝트

---

## 소개

**MOVIELOG**는 영화 예매, 회원 관리, VIP 라운지 채팅, 관리자 대시보드를 갖춘 풀스택 웹 애플리케이션입니다.

---

## 화면 미리보기

### 광고 모달 (진입 시)
![광고 모달](screen_shot/1_Modal_Ad.png)

### 메인 페이지
![메인 페이지](screen_shot/2_MainPage.png)

### 로그인
![로그인](screen_shot/3_Login_Modal.png)

### 회원가입
![회원가입](screen_shot/4_Register_Modal.png)

### 로그인 성공 알림
![로그인 성공](screen_shot/5_Login_Success.png)

### 예매 — 상영 일정 선택
![예매](screen_shot/6_Reservation.png)

### 좌석 선택
![좌석 선택](screen_shot/7_Seat_Select.png)

### 영화 목록
![영화 목록](screen_shot/8_Movie_List.png)

### 마이페이지
![마이페이지](screen_shot/9_MyPage.png)

### VIP 라운지 (실시간 채팅)
![VIP 라운지](screen_shot/10_VIP_Lounge.png)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 회원가입 / 로그인 | 아이디·비밀번호 기반 인증, 회원정보 수정 |
| 영화 목록 | 상영 중인 영화 조회, 검색, 누적 예매수 표시 |
| 영화 예매 | 날짜·시간·상영관 선택 후 좌석 선택 → 결제 |
| 좌석 선택 | 실시간 점유 좌석 표시, 다중 좌석 선택 |
| 결제 | 등록된 카드로 포인트 적립 결제 |
| 마이페이지 | 예매 내역 조회, 포인트 확인, 카드 관리, 프로필 사진 변경 |
| VIP 라운지 | WebSocket 기반 실시간 채팅 (접속자 목록 포함) |
| 이벤트 / 혜택 | 포스터 이미지 목록 조회 |
| 관리자 페이지 | 영화·예매·회원·이벤트·혜택 CRUD 관리 |

---

## 기술 스택

### Frontend
- **React 19** + **Vite 7**
- React Router DOM 7 (SPA 라우팅)
- react-icons, react-input-mask

### Backend
- **Node.js** + **Express 5**
- **MariaDB** (mariadb / mysql2 드라이버)
- **multer** (파일 업로드 — 포스터, 프로필, 이벤트/혜택 이미지)
- **ws** (WebSocket 서버 — VIP 라운지 채팅)
- dotenv (환경변수 관리)

---

## 프로젝트 구조

```
2team_project/
├── back/                       # 백엔드 (Express)
│   ├── index.js                # REST API 서버 (포트 3000)
│   ├── db.js                   # MariaDB 연결 풀
│   ├── server/
│   │   └── wsServer.js         # WebSocket 서버 (포트 3001)
│   ├── upload/                 # 업로드 파일 저장소
│   │   ├── poster/             # 영화 포스터
│   │   ├── profile/            # 사용자 프로필 사진
│   │   ├── event/              # 이벤트 포스터
│   │   └── benefit/            # 혜택 포스터
│   └── .env                    # DB 접속 정보
│
├── front/                      # 프론트엔드 (React + Vite)
│   └── src/
│       ├── App.jsx             # 라우터 설정
│       ├── api.js              # API 베이스 URL 설정
│       ├── Main/               # 메인 페이지, VIP 라운지, 서비스 안내
│       ├── components/         # 예매, 좌석, 결제, 영화, 이벤트, 혜택, 로그인, 회원가입
│       ├── mypage/             # 마이페이지, 정보 수정, 예매 내역
│       ├── Admin/              # 관리자 페이지 및 관리 메뉴
│       └── css/                # 컴포넌트별 스타일시트
│
├── screen_shot/                # UI 스크린샷
└── dump-team2-202604081026.sql # DB 덤프 파일
```

---

## 실행 방법

### 사전 준비
- Node.js 설치
- MariaDB 설치 및 DB 생성 (`team2`)
- DB 덤프 파일 임포트: `dump-team2-202604081026.sql`

### 백엔드 실행
```bash
cd back
npm install
# .env 파일에 DB 접속 정보 입력
npm run a          # nodemon index.js (포트 3000)
node server/wsServer.js   # WebSocket 서버 (포트 3001)
```

### 프론트엔드 실행
```bash
cd front
npm install
npm run dev        # Vite 개발 서버
```

### 환경변수 설정 (`back/.env`)
```
DB_HOST=<MariaDB 호스트>
DB_USER=<DB 사용자>
DB_PASS=<DB 비밀번호>
DB_NAME=team2
```

---

## API 주요 엔드포인트

| Method | 경로 | 설명 |
|--------|------|------|
| GET | `/movies` | 전체 영화 목록 |
| GET | `/movieinfo` | 예매수 기준 영화 목록 |
| POST | `/reserv` | 좌석 예매 |
| GET | `/seatlist/:id` | 내 예매 내역 |
| POST | `/join` | 회원가입 |
| PUT | `/updateProfile` | 프로필 사진 변경 |
| GET | `/eventinfo` | 이벤트 목록 |
| GET | `/benefitinfo` | 혜택 목록 |
| POST | `/movies/add` | (관리자) 영화 추가 |
| DELETE | `/deleteuser` | (관리자) 회원 삭제 |
