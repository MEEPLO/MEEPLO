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
-- Table structure for table `group_member`
--

DROP TABLE IF EXISTS `group_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKm8l32kxn64rt9in09iag9dxyr` (`group_id`),
  KEY `FK2bs9fvt9l0fpy8es2pd91fo0r` (`member_id`),
  CONSTRAINT `FK2bs9fvt9l0fpy8es2pd91fo0r` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKm8l32kxn64rt9in09iag9dxyr` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_member`
--

LOCK TABLES `group_member` WRITE;
/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
INSERT INTO `group_member` VALUES (4,'한나',0,0,2,2),(5,'혜림',1,0,2,1),(6,'이경준',1,0,2,4),(7,'김제관',1,0,2,5),(9,'혜림',0,0,4,1),(10,'공조한',1,0,4,7),(11,'신민아',1,0,2,6),(12,'대양이',0,0,5,5),(13,'대양이',0,0,6,5),(14,'신민아',0,0,7,6),(15,'혜림',0,0,8,1),(16,'한나',1,1,8,2),(17,'이경준',1,0,8,4),(18,'신민아',1,0,8,6),(19,'대양이',1,0,8,5),(23,'한나',0,0,12,2),(24,'이경준',1,0,12,4),(26,'신민아',1,0,12,6),(27,'대양이',1,0,12,5),(28,'준',1,0,12,9),(29,'한나',0,0,14,2),(30,'준',1,0,14,9),(31,'한나',0,0,15,2),(32,'대양이',1,0,15,5),(35,'이경준',0,0,18,4),(36,'한나',1,0,18,2),(37,'혜림',1,1,12,1);
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:30:05
