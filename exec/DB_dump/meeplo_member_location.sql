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
-- Table structure for table `member_location`
--

DROP TABLE IF EXISTS `member_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_location` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `default_location` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbr3h9qdhujxnveeuf416asbdf` (`member_id`),
  CONSTRAINT `FKbr3h9qdhujxnveeuf416asbdf` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_location`
--

LOCK TABLES `member_location` WRITE;
/*!40000 ALTER TABLE `member_location` DISABLE KEYS */;
INSERT INTO `member_location` VALUES (10,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,'멀티캠퍼스',2,_binary '\0'),(12,'서울 양천구 지양로15길 20',37.5239737188018,126.829250021639,'집',1,_binary ''),(14,'서울특별시 은평구 통일로 602-1',37.6007421809861,126.936019442532,'우리집1',3,_binary ''),(15,'서울 은평구 은평로 240',37.6004214734002,126.934948113512,'우리집',4,_binary ''),(17,'서울 강북구 월계로 53',37.6120233028697,127.035536721664,'대양이집',5,_binary ''),(18,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,'멀캠',4,_binary '\0'),(20,'서울특별시 은평구 통일로 602-1',37.6007421809861,126.936019442532,'쉬는 곳',3,_binary '\0'),(22,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,'멀티캠퍼스',1,_binary '\0'),(23,'인천 부평구 원적로 344',37.5039922860743,126.703947957183,'집',7,_binary ''),(24,'서울 강남구 테헤란로 212',37.5012767241426,127.039600248343,'멀티캠퍼스',6,_binary '\0'),(26,'서울특별시 은평구 통일로 602-1',37.6007421809861,126.936019442532,'쉬는 곳2',3,_binary '\0'),(27,'서울 서초구 강남대로 355',37.4943664214248,127.028829354357,'꿈의그곳',1,_binary '\0'),(28,'서울 은평구 응암로 142-23',37.5844601429044,126.915733075763,'우리집',2,_binary ''),(29,'서울 은평구 증산로 지하 477',37.5987423282207,126.915512801302,'응암역',9,_binary ''),(30,'서울 성동구 천호대로 지하 300',37.5664458277827,127.05318095956,'50만원',6,_binary '');
/*!40000 ALTER TABLE `member_location` ENABLE KEYS */;
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
