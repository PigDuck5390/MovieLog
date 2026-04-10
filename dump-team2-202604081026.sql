/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: 192.168.0.227    Database: team2
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` text DEFAULT NULL,
  `admin_pw` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES
('admin1','123123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benefit`
--

DROP TABLE IF EXISTS `benefit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefit` (
  `defid` int(11) NOT NULL AUTO_INCREMENT,
  `poster_path` text DEFAULT NULL,
  `poster_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`defid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefit`
--

LOCK TABLES `benefit` WRITE;
/*!40000 ALTER TABLE `benefit` DISABLE KEYS */;
INSERT INTO `benefit` VALUES
(28,'/upload/benefit/1775537897156.png','BenefitPoster.png');
/*!40000 ALTER TABLE `benefit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `defid` int(11) NOT NULL AUTO_INCREMENT,
  `poster_path` text DEFAULT NULL,
  `poster_name` text DEFAULT NULL,
  PRIMARY KEY (`defid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES
(15,'/upload/event/1775537955094.png','1775537877035.png'),
(17,'/upload/event/1775537955113.png','EventPoster2.png');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_info`
--

DROP TABLE IF EXISTS `movie_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_info` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `screen_number` int(11) DEFAULT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `poster` text DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `reserv_count` int(11) DEFAULT 0,
  `start_time1` text DEFAULT NULL,
  `start_time2` text DEFAULT NULL,
  `start_time3` text DEFAULT NULL,
  `start_time4` text DEFAULT NULL,
  `start_time5` text DEFAULT NULL,
  `start_time6` text DEFAULT NULL,
  `start_time7` text DEFAULT NULL,
  `start_time8` text DEFAULT NULL,
  `start_time9` text DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_info`
--

LOCK TABLES `movie_info` WRITE;
/*!40000 ALTER TABLE `movie_info` DISABLE KEYS */;
INSERT INTO `movie_info` VALUES
(17,1,'주토피아2','디즈니의 가~~장 사랑스러운 콤비 \'주디\'와 \'닉\'이 돌아온다!\r\n\r\n미스터리한 뱀 ‘게리’가 나타난 순간,\r\n주토피아가 다시 흔들리기 시작했다!\r\n\r\n혼란에 빠진 도시를 구하기 위해\r\n환상의 콤비 ‘주디’ & ‘닉’이 잠입 수사에 나서고\r\n상상 그 이상의 진실과 위협을 마주하게 되는데...!\r\n\r\n11월, 초특급 추적 어드벤처가 펼쳐진다!','더 화려해진 세계, 더 넓어진 주토피아!','/upload/poster/1775529590821.jpg',108,97,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(18,2,'아바타: 불과 재','판도라를 위협하는 재의 부족, 더 이상 인간만이 적이 아니다!\r\n12월, 모두의 운명을 뒤흔들 거대한 전투가 시작된다!\r\n','월드 와이드 흥행 불멸의 1위 <아바타> 시리즈의 세 번째 이야기!','/upload/poster/1775529601881.jpg',197,4,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(19,3,'윗집사람들','너희도 솔직해지고 싶지 않아?\r\n\r\n불같던 결혼 생활은 사라지고 무미건조한 일상만 남은 정아(공효진)와 현수(김동욱)','세상의 부부들은 정말 밤마다 사랑을 나눌까?','/upload/poster/1775529610726.jpg',107,0,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(20,4,'반지의 제왕: 두 개의 탑','9명의 반지원정대는 사우론의 사악한 세력에 맞서 반지를 지켜냈지만 반지 원정대는 뿔뿔이 흩어지게 된다. 호빗족으로 절대반지에 유일한 내성을 보이는 \'프로도\'는 일행과 떨어져 \'샘\'과 함께 불의 산으로 모험을 감행하지만 새로운 위협을 맞이하고 사루만의 우르쿠하이 군대에게 잡혀간 \'메리\'와 \'피핀\'은 엔트 족의 영역에서 \'트리비어드\'라는 엔트 족에게 구출 받게 된다. 한편 \'메리\'와 \'피핀\'을 구하기 위해 우루쿠하이 군대를 추격하던 \'아라곤\'과 \'레골라스\', \'김리\'는 유령 숲에서 백색의 마법사로 부활한 마법사 \'간달프\'를 만나게 되고 악의 군주 \'사우론\'이 암흑세계의 두 개의 탑 \'오르상크\'와 \'바랏두르\'를 통합하여 점점 그 세력을 넓혀가고 있다는 사실을 듣게 된다. 이에 \'아라곤\'과 나머지 원정대는 중간계의 선한 무리의 통합을 이뤄 \'사우론\'의 강력한 세력을 견제해야하는 큰 임무를 맡게 된다. 하지만 동맹관계가 깨져 \'곤도르\' 왕국과 \'로한\'왕국으로 나뉜 인간 종족의 통합은 쉽지 않고 게다가 \'로한\'의 왕마저 \'사루만\'에게 동화되는데.. 결국 \'사우론\'은 서서히 중간계를 거대한 전쟁의 소용돌이로 몰고 가고 \'아라곤\' 또한 인간과 엘프, 난쟁이족, 그리고 엔트족 등을 통합하여 이에 맞설 준비를 한다. 결코 피할 수 없는 거대한 전쟁이 시작된 것이다.','2002년 12월, 운명을 건 최후의 전쟁이 시작된다','/upload/poster/1775529618485.jpg',179,0,'09:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(21,5,'극장판 주술회전: 시부야사변 X 사멸회유','시부야 역 주변에 갑자기 ‘장막’이 내려지고, 다수의 일반인이 갇히게 된다.\r\n그곳에 홀로 뛰어든 현대 최강의 주술사, 고죠 사토루.\r\n그러나 그곳에는 고죠의 봉인을 꾀하는 주저사·주령들이 기다리고 있었다.','2018년 10월 31일','/upload/poster/1775529629426.jpg',87,0,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(22,6,'극장판 체인소 맨: 레제편','압도적 배틀 액션이 스크린에서 폭발한다!\r\n\r\n데블 헌터로 일하는 소년 ‘덴지’는 조직의 배신으로 죽음에 내몰린 순간\r\n전기톱 악마견 ‘포치타’와의 계약으로 하나로 합쳐져\r\n누구도 막을 수 없는 존재 ‘체인소 맨’으로 다시 태어난다.\r\n\r\n악마와 사냥꾼, 그리고 정체불명의 적들이 얽힌 잔혹한 전쟁 속에서\r\n‘레제’라는 이름의 미스터리한 소녀가 ‘덴지’ 앞에 나타나는데…\r\n‘덴지’는 사랑이라는 감정에 이끌려 지금껏 가장 위험한 배틀에 몸을 던진다!','인기 애니메이션 \'체인소 맨\' 첫 공식 극장판 국내 상륙!','/upload/poster/1775529635251.jpg',100,3,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(23,7,'나우 유 씨 미 3','한때 더러운 방식으로 돈을 모으는 재벌들을 시원하게 혼내주던 마술사기단 ‘포 호스맨’.\r\n\r\n은퇴 후 평범한 삶을 살고 있던 그들에게 새로운 임무를 알리는 의미심장한 카드가 배달된다.\r\n그렇게 다시 모이게 된 오리지널 ‘포 호스맨’은\r\n자신들을 흉내 내던 신예 마술사들까지 영입하며 미션을 준비한다.\r\n\r\n그들의 목표는 무기 밀매, 자금 세탁 등 더러운 돈에 물든 ‘하트 다이아몬드’를 훔치는 것.\r\n하지만 다이아몬드를 훔치고, 통쾌한 쇼를 선보이려는 이들 앞에는 수많은 함정이 펼쳐지는데…\r\n\r\n올가을, 더 통쾌해진 지상 최고의 쇼가 스크린에 펼쳐진다!\r\n','나쁜 놈들 잡는 마술사기단, 훔치고, 속이고, 즐겨라!','/upload/poster/1775529644140.jpg',112,0,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'),
(24,8,'정보원','공들인 작전 실패로 강등당한 후\r\n열정도, 의지도, 수사 감각도 모두 잃은 형사 오남혁.\r\n이제 그가 바라는 것은 오로지 한탕과 은퇴뿐.\r\n\r\n밀수 조직에 심어둔 정보원 조태봉을 이용해 인생 역전을 꿈꾸지만\r\n의리도, 믿음도 없는 조태봉은 숨겨뒀던 돈을 챙겨 빠르게 손절을 하고,\r\n뒤늦게 밀수 조직 사무실에 도착한 오남혁은 낯선 무리에게 납치를 당한다.\r\n\r\n이 일로 얼떨결에 목숨이 걸린 범죄 사건에 휘말리게 된 오남혁과 조태봉은\r\n각자의 목적을 위해 동상이몽 공조 수사를 시작하는데…','“나 오늘 거기 털고 옷 벗는다”','/upload/poster/1775529653467.jpg',103,0,'08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00');
/*!40000 ALTER TABLE `movie_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seat_id` int(11) NOT NULL AUTO_INCREMENT,
  `screen_num` int(11) NOT NULL,
  `seat_num` text NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `date` text DEFAULT NULL,
  `time` text DEFAULT NULL,
  `movie_name` text DEFAULT NULL,
  `userName` text DEFAULT NULL,
  `pickcount` int(11) DEFAULT NULL,
  `card_num` varchar(50) DEFAULT NULL,
  `card_bank` varchar(50) DEFAULT NULL,
  `card_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=428 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES
(414,10,'B2,B3,B4,B5,C5,C4,C3,C2','yjh0207m','2025-12-19','22:00','뽀로로 극장판 스위트캐슬 대모험','즐거운 관리자',8,'5465-4545-8293-7154','신한은행','12/23'),
(419,11,'B3,B4,B5','hon123','2025-12-23','10:00','위키드','홍홍길동',3,'1234-1234-5678-5678','카카오뱅크','12/23'),
(420,10,'B2,B3,B4,B5,B6,C6,C5,C4,C3,C2','hon123','2025-12-31','22:00','뽀로로 극장판 스위트캐슬 대모험','홍홍길동',10,'1234-1234-5678-5678','카카오뱅크','12/23'),
(421,10,'B2,B3,B4,B5,B6,C6,C5,C4,C3,C2','hon123','2025-12-31','22:00','뽀로로 극장판 스위트캐슬 대모험','홍홍길동',10,'1234-1234-5678-5678','카카오뱅크','12/23'),
(422,1,'B3,B4','asdf','2026-01-14','08:00','주토피아2','너굴',2,'1535-8647-6556-1512','국민은행','12/27'),
(424,14,'C3,C4','test12','2026-01-14','13:00','우리...조금만 더 걸을까','너구리',2,'1235-1235-1245-7845','국민은행','12/27'),
(425,2,'B2,B3,C4,D5','asdf','2025-12-18','14:00','아바타: 불과 재','너굴',4,'1234-1234-1234-1234','국민은행','12/28'),
(426,1,'B3','aa','2026-01-15','08:00','주토피아2','호랑이',1,'1234-1234-1234-1234','SAMSUNG','12/12'),
(427,1,'C3,C4,C5','aa','2026-01-15','08:00','주토피아2','호랑이',3,'1234-1234-1234-1234','SAMSUNG','12/12');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `defid` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pw` varchar(50) NOT NULL,
  `profile` varchar(50) DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  PRIMARY KEY (`defid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(30,'yjh0207m','관리자','123',NULL,20000),
(31,'asdf','너굴','aaa','/upload/profile/1765868344755-ë¤ì´ë¡ë.jpg',540),
(34,'aa','호랑이','aa','/upload/profile/1768357175579.jpg',500),
(42,'jh','jh','jh',NULL,490),
(43,'jjh','jjh','jjh',NULL,500);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_card`
--

DROP TABLE IF EXISTS `user_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_card` (
  `card_defid` int(11) NOT NULL AUTO_INCREMENT,
  `user_defid` int(11) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `card_num` varchar(50) DEFAULT NULL,
  `card_date` varchar(50) DEFAULT NULL,
  `card_bank` varchar(50) DEFAULT NULL,
  `card_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`card_defid`),
  KEY `defid` (`user_defid`) USING BTREE,
  CONSTRAINT `FK_user_card_user` FOREIGN KEY (`user_defid`) REFERENCES `user` (`defid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_card`
--

LOCK TABLES `user_card` WRITE;
/*!40000 ALTER TABLE `user_card` DISABLE KEYS */;
INSERT INTO `user_card` VALUES
(46,30,'yjh0207m','5465-4545-8293-7154','12/23','신한은행','엄마카드'),
(63,31,'asdf','1234-1234-1234-1234','12/28','국민은행','asdf'),
(71,34,'aa','1234-1234-1234-1234','12/12','SAMSUNG','samsung'),
(72,34,'aa','1234-1234-1234-1234','11/11','HYUNDAI','dfd');
/*!40000 ALTER TABLE `user_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'team2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-04-08 10:26:54
