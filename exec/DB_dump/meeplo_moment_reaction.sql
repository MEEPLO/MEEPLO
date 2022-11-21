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
-- Table structure for table `moment_reaction`
--

DROP TABLE IF EXISTS `moment_reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moment_reaction` (
  `moment_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  KEY `FKmxqltvuaa8e24mytknag05cim` (`member_id`),
  KEY `FKfnp5m9ilmde8ln1vni196kky5` (`moment_id`),
  CONSTRAINT `FKfnp5m9ilmde8ln1vni196kky5` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`),
  CONSTRAINT `FKmxqltvuaa8e24mytknag05cim` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_reaction`
--

LOCK TABLES `moment_reaction` WRITE;
/*!40000 ALTER TABLE `moment_reaction` DISABLE KEYS */;
INSERT INTO `moment_reaction` VALUES (33,1),(34,1),(32,1),(31,1),(21,1),(29,1),(25,1),(39,1),(36,1),(37,1),(19,2),(41,2),(42,2),(46,4),(47,2),(46,2),(48,2),(51,2),(52,5),(46,1);
/*!40000 ALTER TABLE `moment_reaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:30:04
