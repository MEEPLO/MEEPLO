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
-- Table structure for table `moment`
--

DROP TABLE IF EXISTS `moment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `moment_photo` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `schedule_location_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg7h2vig37juf73k24hjw8d8oi` (`member_id`),
  KEY `FK1nmr2vgr1lpe9wr16nt7o1wt4` (`schedule_location_id`),
  CONSTRAINT `FK1nmr2vgr1lpe9wr16nt7o1wt4` FOREIGN KEY (`schedule_location_id`) REFERENCES `schedule_location` (`id`),
  CONSTRAINT `FKg7h2vig37juf73k24hjw8d8oi` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment`
--

LOCK TABLES `moment` WRITE;
/*!40000 ALTER TABLE `moment` DISABLE KEYS */;
INSERT INTO `moment` VALUES (18,'2022-11-20 05:20:14.194624','2022-11-20 05:20:14.194624','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120051822.png',0,2,7),(19,'2022-11-20 05:21:46.310786','2022-11-20 05:21:46.310786','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052140.png',1,2,6),(20,'2022-11-20 05:22:26.894936','2022-11-20 05:22:26.894936','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052209.png',2,2,6),(21,'2022-11-20 05:23:01.922872','2022-11-20 05:23:01.922872','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052255.png',1,2,6),(22,'2022-11-20 05:23:45.270268','2022-11-20 05:23:45.270268','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052333.png',0,2,7),(23,'2022-11-20 05:26:24.684733','2022-11-20 05:26:24.684733','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052457.png',0,2,6),(24,'2022-11-20 05:26:56.468845','2022-11-20 05:26:56.468845','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052648.png',2,2,6),(25,'2022-11-20 05:27:26.973214','2022-11-20 05:27:26.973214','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052721.png',1,2,7),(26,'2022-11-20 05:28:01.030258','2022-11-20 05:28:01.030258','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052754.png',1,2,6),(27,'2022-11-20 05:28:29.295231','2022-11-20 05:28:29.295231','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052823.png',0,2,6),(28,'2022-11-20 05:29:00.384807','2022-11-20 05:29:00.384807','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052854.png',2,2,7),(29,'2022-11-20 05:29:56.290339','2022-11-20 05:29:56.290339','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120052950.png',0,2,6),(30,'2022-11-20 05:30:39.029591','2022-11-20 05:30:39.029591','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053032.png',1,2,6),(31,'2022-11-20 05:35:33.153856','2022-11-20 05:35:33.153856','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053526.png',1,2,7),(32,'2022-11-20 05:36:06.204114','2022-11-20 05:36:06.204114','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053600.png',2,2,6),(33,'2022-11-20 05:36:41.468609','2022-11-20 05:36:41.468609','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053635.png',1,2,7),(34,'2022-11-20 05:37:04.138166','2022-11-20 05:37:04.138166','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053659.png',0,2,7),(35,'2022-11-20 05:37:28.368743','2022-11-20 05:37:28.368743','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053723.png',1,2,7),(36,'2022-11-20 05:38:03.845593','2022-11-20 05:38:03.845593','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053757.png',0,2,6),(37,'2022-11-20 05:38:32.047058','2022-11-20 05:38:32.047058','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053825.png',2,2,6),(38,'2022-11-20 05:39:12.420805','2022-11-20 05:39:12.420805','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053906.png',1,2,7),(39,'2022-11-20 05:39:51.660244','2022-11-20 05:39:51.660244','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120053946.png',2,2,6),(40,'2022-11-20 05:40:40.520569','2022-11-20 05:40:40.520569','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120054034.png',1,2,7),(41,'2022-11-20 18:34:23.383344','2022-11-20 18:34:23.383344','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120183415.png',2,1,6),(42,'2022-11-20 18:36:00.303277','2022-11-20 18:36:00.303277','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120183547.png',2,1,6),(43,'2022-11-20 22:29:42.333458','2022-11-20 22:29:42.333458','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120222928.png',1,1,6),(44,'2022-11-20 22:59:20.321869','2022-11-20 22:59:20.321869','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120225900.png',1,1,9),(45,'2022-11-20 23:04:54.557757','2022-11-20 23:04:54.557757','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120230443.png',1,1,9),(46,'2022-11-20 23:43:18.596092','2022-11-20 23:43:18.596092','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221120234314.png',1,1,7),(47,'2022-11-21 00:33:28.724170','2022-11-21 00:33:28.724170','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221121003316.png',1,2,12),(48,'2022-11-21 01:01:05.904270','2022-11-21 01:01:05.904270','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221121010057.png',1,2,16),(49,'2022-11-21 01:03:02.405685','2022-11-21 01:03:02.405685','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221121010255.png',0,2,12),(50,'2022-11-21 01:03:54.420757','2022-11-21 01:03:54.420757','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221121010347.png',2,2,12),(51,'2022-11-21 01:05:08.013631','2022-11-21 01:05:08.013631','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221121010502.png',0,2,12),(52,'2022-11-21 01:10:39.792017','2022-11-21 01:10:39.792017','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221121011034.png',1,5,14);
/*!40000 ALTER TABLE `moment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:30:08
