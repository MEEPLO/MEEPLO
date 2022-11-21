-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: k7a508.p.ssafy.io    Database: meeplo
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `is_unactivated` bit(1) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2022-11-18 16:54:08.527274','2022-11-20 18:52:47.277770',_binary '\0','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_e5607111-5f3d-4dfa-95dc-a099c35bdf5c.jpg','kakao','2507395402','혜림'),(2,'2022-11-18 18:17:35.197048','2022-11-18 18:17:35.197048',_binary '\0','http://k.kakaocdn.net/dn/JELNL/btreCCTvBCo/naMc0iTZK6u2hq56ullvdk/img_640x640.jpg','kakao','2517716374','한나'),(3,'2022-11-18 19:08:37.785788','2022-11-18 19:08:37.785788',_binary '\0','http://k.kakaocdn.net/dn/r5I3W/btrRvHgzlrU/mpH9f6oqOG0wujAtQGDYkK/img_640x640.jpg','kakao','2507370658','이경준'),(4,'2022-11-19 17:03:48.586111','2022-11-19 17:03:48.586111',_binary '\0','http://k.kakaocdn.net/dn/r5I3W/btrRvHgzlrU/mpH9f6oqOG0wujAtQGDYkK/img_640x640.jpg','kakao','2537759264','이경준'),(5,'2022-11-19 17:21:37.365103','2022-11-19 22:02:21.623844',_binary '\0','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_ca8b7677-5fa2-4dbf-9934-38c4a345b3d8.jpg','kakao','2516884814','대양이'),(6,'2022-11-19 20:17:39.972842','2022-11-19 21:53:01.584211',_binary '\0','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_88d808da-136b-46b7-821f-08ff76718b38.jpg','kakao','2537768757','신민아'),(7,'2022-11-19 21:19:48.474887','2022-11-19 22:02:54.982834',_binary '\0','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_00129e84-70bf-4248-81b8-de1b9cd58264.png','kakao','2541342835','공조한'),(8,'2022-11-20 21:58:00.618786','2022-11-20 21:58:00.618786',_binary '\0','http://k.kakaocdn.net/dn/hvBh8/btrN24nonws/wmSOFGoswGuPiv6kWEiLnk/img_640x640.jpg','kakao','2500389794','준'),(9,'2022-11-21 00:01:34.262130','2022-11-21 00:01:34.262130',_binary '\0','http://k.kakaocdn.net/dn/hvBh8/btrN24nonws/wmSOFGoswGuPiv6kWEiLnk/img_640x640.jpg','kakao','2542855908','준'),(10,'2022-11-21 00:11:21.797645','2022-11-21 00:11:21.797645',_binary '\0','http://k.kakaocdn.net/dn/csSFVZ/btrRuvnlvG7/rJ268MOBPYAcCfW7hKLCZk/img_640x640.jpg','kakao','2518194786','신민아');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:04:42
