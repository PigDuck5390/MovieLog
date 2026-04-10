const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require("path");
const fs = require("fs");
const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

//정적 데이터를 읽을 파일 경로, 브라우저 URL 선언 및 연결
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// 존재하지 않는 이미지 요청 → 폴더 내 비슷한 이름 파일 자동 매칭
app.use('/upload', (req, res) => {
  const decodedPath = decodeURIComponent(req.path);
  const fullDir = path.join(__dirname, 'upload', path.dirname(decodedPath));
  const reqName = path.basename(decodedPath).toLowerCase().replace(/[^a-z0-9가-힣]/g, '');

  try {
    const files = fs.readdirSync(fullDir);
    const matched = files.find(f =>
      f.toLowerCase().replace(/[^a-z0-9가-힣]/g, '').includes(reqName) ||
      reqName.includes(f.toLowerCase().replace(/[^a-z0-9가-힣]/g, ''))
    );
    if (matched) {
      return res.sendFile(path.join(fullDir, matched));
    }
  } catch (e) {}

  res.status(404).send('Not found');
});

//신규 파일 저장경로 및 파일명 규칙 선언
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(req.path == '/benefit/add'){
      cb(null, path.join(__dirname, 'upload', 'benefit'))
    }else if (req.path == '/updateProfile' || req.path == '/admin/updateprofile'){
      cb(null, path.join(__dirname, 'upload', 'profile'))
    }else if (req.path == '/event/add'){
      cb(null, path.join(__dirname, 'upload', 'event'))
    }else if (req.path == '/movies/add' || req.path == '/movies/updateposter'){
      cb(null, path.join(__dirname, 'upload', 'poster'))
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  }
});

//멀터 변수화
const upload = multer({ storage })

// -------------------------------------------- //



//유저정보 호출
app.get('/userinfo', async (req, res) => {
  const data = await pool.query('SELECT * FROM user')
  res.send(data)
})

//예매정보 호출
app.get('/seatlist', async (req, res) => {
  const data = await pool.query('SELECT * FROM seat')
  res.send(data)
})

//나의 예매정보 호출
app.get("/seatlist/:id", async (req, res) => {
  const data = await pool.query("SELECT * FROM seat WHERE user_id=? ORDER BY seat_id DESC",
    [req.params.id]
  );
  res.send(data);
})

//영화 포인트 조회
app.get("/point/:id", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT point FROM user WHERE id=?",
    [req.params.id]
  );
  res.json(rows.point);
});

//영화 포인트 수정
app.put("/point/add/:id", async (req, res) => {
  const addPoint = req.body.addPoint;
  await pool.query(
    "UPDATE user SET point = point + ? WHERE id = ?",
    [addPoint, req.params.id]
  );
  res.json({ success: true, added: addPoint });
});

//영화 예매누적
app.put("/reservcount", async (req, res) => {
  const addPoint = req.body.addCount;
  await pool.query(
    "UPDATE movie_info SET reserv_count = reserv_count + ? WHERE movie_id = ?",
    [addPoint, req.body.movieId]
  );
});

//영화정보 호출
app.get('/movies', async (req, res) => {
  const data = await pool.query(
    'SELECT * FROM movie_info')
  res.send(data)
})

//영화정보 호출 (예매누적수 기반 내림차순) 
app.get('/movieinfo', async (req, res) => {
  const data = await pool.query(
    'SELECT * FROM movie_info ORDER BY reserv_count DESC')
  res.send(data)
})

//신규 예매
app.post('/reserv', async (req, res) => {
  await pool.query(
    'INSERT INTO seat (seat_num, user_id, date, time, movie_name, userName, screen_num, pickcount, card_num, card_bank, card_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.seat, req.body.userId, req.body.date, req.body.movieTime, req.body.movieName, req.body.userName, req.body.screen, req.body.pickcount,req.body.cardNumber,req.body.cardBank,req.body.cardDate]
  )
  res.json({ success: true })
})

//회원가입
app.post('/join', async (req, res) => {
  await pool.query('INSERT INTO user (name, id, pw, point) VALUES (?,?,?,?)',
    [req.body.userName, req.body.userId, req.body.userPw, 490]
  )
  res.json({ success: true })
})

//프로필 사진 변경
app.put("/updateProfile", upload.single("profile"), async (req, res) => {
  const filePath = `/upload/profile/${req.file.filename}`;
  await pool.query(
    "UPDATE user SET profile = ? WHERE id = ?",
    [filePath, req.body.userId]
  );
  res.json({ success: true, profile: filePath });
})

//프로필 사진 호출
app.get("/userprofile/:id", async (req, res) => {
  const data = await pool.query("SELECT profile FROM user WHERE id=?",
    [req.params.id]
  );
  res.send(data);
})

//비밀번호 변경
app.put('/changePassword', async (req, res) => {
  await pool.query("UPDATE user SET pw = ? WHERE id =?",
    [req.body.newPassword, req.body.userId]
  )
})

app.put('/changeName', async (req, res) => {
  await pool.query("UPDATE user SET name = ? WHERE id =?",
    [req.body.newName, req.body.userId]
  )
})

//카드 신규 등록
app.post('/newcard', async (req, res) => {
  await pool.query(
    "INSERT INTO user_card (user_id, card_num, card_date, user_defid, card_bank, card_name) VALUES (?,?,?,?,?,?)",
    [req.body.userId, req.body.card, req.body.cardDate, req.body.defid, req.body.bank, req.body.name])
  res.json({ success: true })
})

//카드 정보 호출
app.get('/cardinfo', async (req, res) => {
  const data = await pool.query("SELECT * FROM user_card")
  res.send(data)
})

//카드 삭제
app.delete('/carddelete', async (req, res) => {
  await pool.query("DELETE FROM user_card WHERE card_defid = ?",
    [req.body.defid]
  )
})

//카드 별명 수정
app.put('/cardnameupdate', async (req, res) => {
  await pool.query("UPDATE user_card SET card_name = ? WHERE card_defid = ?",
    [req.body.cardName, req.body.cardId]
  )
})
//이벤트 정보 호출
app.get('/eventinfo', async (req, res) => {
  const data = await pool.query('SELECT * FROM event')
  res.send(data)
})

//혜택 정보 호출
app.get('/benefitinfo', async (req, res) => {
  const data = await pool.query('SELECT * FROM benefit')
  res.send(data)
})

app.get('/cardinfo/:id', async (req, res) => {
  const data = await pool.query("SELECT * FROM user_card WHERE user_id = ?",
    [req.params.id]
  )
  res.send(data)
})

//관리자 정보 호출
app.get('/admin', async (req, res) =>{
  const data = await pool.query("SELECT * FROM admin")
  res.send(data)
})

//관리자 : 영화 포스터 파일 교체
app.put('/movies/updateposter', upload.single('poster'), async (req, res) => {
  const filePath = `/upload/poster/${req.file.filename}`;
  await pool.query(
    'UPDATE movie_info SET poster = ? WHERE movie_id = ?',
    [filePath, req.body.movieId]
  );
  res.json({ success: true, poster: filePath });
});

//관리자 : 영화 수정
app.put('/movies/update', async (req, res) => {
  await pool.query(
    `UPDATE movie_info SET ${req.body.field} = ? WHERE movie_id = ?`,
    [req.body.newData, req.body.movieId]
  )
  }
);

//관리자 : 영화 삭제
app.delete('/movies/delete', async (req, res) => {
  await pool.query(
    `DELETE FROM movie_info WHERE movie_id = ?`,
    [req.body.movieId]
  )
  }
);

//관리자 : 영화 추가
app.post('/movies/add', upload.single('poster'), async (req, res) => {
  const filePath = `/upload/poster/${req.file.filename}`;
  await pool.query(
    'INSERT INTO movie_info (screen_number, title, description, short_description, poster, runtime, start_time1, start_time2, start_time3, start_time4, start_time5, start_time6, start_time7, start_time8, start_time9) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.screen_number, req.body.title, req.body.description, req.body.short_description, filePath, req.body.runtime, req.body.start_time1, req.body.start_time2, req.body.start_time3, req.body.start_time4, req.body.start_time5, req.body.start_time6, req.body.start_time7, req.body.start_time8, req.body.start_time9]
  )
});

//관리자 : 예매 추가
app.post('/seat/add', async (req, res) => {
  await pool.query(
    'INSERT INTO seat (seat_num, user_id, date, time, movie_name, userName, screen_num) VALUES (?,?,?,?,?,?,?)',
    [req.body.seat_num, req.body.user_id, req.body.date, req.body.time, req.body.movie_name, req.body.userName, req.body.screen_num]
  )
});

//관리자 : 예매 수정
app.put('/seat/update', async (req, res) => {
  await pool.query(
    `UPDATE seat SET ${req.body.field} = ? WHERE seat_id = ?`,
    [req.body.newData, req.body.seatId]
  )
  }
);

//관리자 : 예매 삭제
app.delete('/seat/delete', async (req, res) => {
  await pool.query(
    `DELETE FROM seat WHERE seat_id = ?`,
    [req.body.seatId]
  )
  }
);

//관리자 : 혜택 포스터 추가
app.post('/benefit/add', upload.array('benefitPoster'), async (req, res) => {
  for(let i=0; i<req.files.length; i++){
    const filePath = `/upload/benefit/${req.files[i].filename}`;
    await pool.query(
      'INSERT INTO benefit (poster_name, poster_path) VALUES (?,?)',
      [req.files[i].originalname, filePath]
    )
  }
});

//관리자 : 혜택 포스터 삭제
app.delete('/benefit/delete', async (req, res) => {
  await pool.query(
    `DELETE FROM benefit WHERE defid = ?`,
    [req.body.defid]
  )
  }
);

//관리자 : 이벤트 포스터 추가
app.post('/event/add', upload.array('eventPoster'), async (req, res) => {
  for(let i=0; i<req.files.length; i++){
    const filePath = `/upload/event/${req.files[i].filename}`;
    await pool.query(
      'INSERT INTO event (poster_name, poster_path) VALUES (?,?)',
      [req.files[i].originalname, filePath]
    )
  }
});

//관리자 : 이벤트 포스터 삭제
app.delete('/event/delete', async (req, res) => {
  await pool.query(
    `DELETE FROM event WHERE defid = ?`,
    [req.body.defid]
  )
  }
);

//관리자 : 유저 삭제
app.delete('/deleteuser', async (req, res) => {
  await pool.query(
    `DELETE FROM user WHERE defid = ?`,
    [req.body.defid]
  )
  }
);

//관리자 : 유저 프로필 사진 변경 (defid 기반)
app.put('/admin/updateprofile', upload.single('profile'), async (req, res) => {
  const filePath = `/upload/profile/${req.file.filename}`;
  await pool.query(
    'UPDATE user SET profile = ? WHERE defid = ?',
    [filePath, req.body.defid]
  );
  res.json({ success: true, profile: filePath });
});

//관리자 : 유저 프로필 기본사진으로 변경
app.put('/setdefaultprofile', async (req, res) => {
  await pool.query(
    `UPDATE user SET profile = NULL WHERE defid = ?`,
    [req.body.defid]
  )
  }
);

//관리자 : 유저 정보 수정
app.put('/userupdate', async (req, res) => {
  await pool.query(
    `UPDATE user SET ${req.body.field} = ? WHERE defid = ?`,
    [req.body.newData, req.body.userDefid]
  )
  }
);

//서버 실행
app.listen(3000,"0.0.0.0", () => {
  console.log('서버 실행')
})
