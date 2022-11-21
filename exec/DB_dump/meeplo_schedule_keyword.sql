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
-- Table structure for table `schedule_keyword`
--

DROP TABLE IF EXISTS `schedule_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_keyword` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `classification` int DEFAULT NULL,
  `keyword` varchar(6) DEFAULT NULL,
  `schedule_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpawnumhxt2ctpbcitk8inwkrx` (`schedule_id`),
  CONSTRAINT `FKpawnumhxt2ctpbcitk8inwkrx` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_keyword`
--

LOCK TABLES `schedule_keyword` WRITE;
/*!40000 ALTER TABLE `schedule_keyword` DISABLE KEYS */;
INSERT INTO `schedule_keyword` VALUES (8,NULL,'양꼬치',7),(9,NULL,'쭈꾸미',8),(25,NULL,'치킨',23),(26,NULL,'라멘',24),(27,NULL,'돼지고기',25),(28,NULL,'삼겹살',25),(29,NULL,'피자',26),(30,NULL,'삼겹살',27),(31,NULL,'곱창',28),(32,NULL,'비빔밥',29),(33,NULL,'돼지고기',30),(34,NULL,'삼겹살',30),(35,NULL,'자전거',31),(36,NULL,'삼겹살',32);
/*!40000 ALTER TABLE `schedule_keyword` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:30:01
