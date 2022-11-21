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
-- Table structure for table `schedule_member`
--

DROP TABLE IF EXISTS `schedule_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `role` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `schedule_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK99vdm7ognogphvp4dk42tgt3o` (`member_id`),
  KEY `FKktkmvkdawruv5us5n47rmpniu` (`schedule_id`),
  CONSTRAINT `FK99vdm7ognogphvp4dk42tgt3o` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKktkmvkdawruv5us5n47rmpniu` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_member`
--

LOCK TABLES `schedule_member` WRITE;
/*!40000 ALTER TABLE `schedule_member` DISABLE KEYS */;
INSERT INTO `schedule_member` VALUES (11,NULL,NULL,NULL,0,1,2,7),(12,NULL,NULL,NULL,1,1,1,7),(13,NULL,NULL,NULL,1,1,4,7),(14,NULL,NULL,NULL,1,1,5,7),(15,NULL,NULL,NULL,0,1,2,8),(16,NULL,NULL,NULL,1,1,1,8),(17,NULL,NULL,NULL,1,1,4,8),(18,NULL,NULL,NULL,1,1,5,8),(24,'서울 양천구 지양로15길 20',37.5239737188018,126.829250021639,0,1,1,14),(25,'인천 부평구 원적로 344',37.5039922860743,126.703947957183,1,1,7,14),(29,'서울 양천구 지양로15길 20',37.5239737188018,126.829250021639,0,1,1,18),(30,'인천 부평구 원적로 344',37.5039922860743,126.703947957183,1,1,7,18),(35,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,23),(36,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,1,1,4,23),(37,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,23),(38,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,23),(39,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,23),(40,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,24),(41,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,24),(42,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,24),(43,'서울 양천구 지양로15길 20',37.5239737188018,126.829250021639,0,1,1,25),(44,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,1,1,2,25),(45,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,1,1,4,25),(46,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,25),(47,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,26),(48,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,1,1,4,26),(49,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,26),(50,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,26),(51,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,27),(52,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,1,1,4,27),(53,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,27),(54,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,27),(55,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,27),(56,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,28),(57,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,28),(58,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,28),(59,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,28),(60,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,29),(61,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,29),(62,'서울 양천구 지양로15길 20',37.5239737188018,126.829250021639,0,1,1,30),(63,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,1,1,2,30),(64,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,1,1,4,30),(65,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,30),(66,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,0,1,5,31),(67,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,1,1,2,31),(68,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,1,1,4,31),(69,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,31),(70,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,31),(71,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,0,1,2,32),(72,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,1,1,6,32),(73,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,1,1,5,32),(74,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,1,1,9,32);
/*!40000 ALTER TABLE `schedule_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:30:12
