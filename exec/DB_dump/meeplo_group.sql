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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `group_photo` varchar(255) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `enter_code` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (2,'2022-11-19 17:14:44.874537','2022-11-19 17:14:44.874537','정예요원들만 모인 간지 플젝팀 그잡채','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_8ce0ead4-8e3d-4b69-91d1-720a10188412.jpg','SSAFY 자율플젝 A508','fe798446-c3b6-4f1b-a2e3-264fe26df5c2'),(4,'2022-11-19 19:18:02.718500','2022-11-20 20:40:43.448993','존맛탱','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_8009fdb4-9405-44a8-ad6c-11b08a494b49.jpg','등심탕수육','dbab7155-8f9d-4b51-b7bc-6daf323cfbed'),(5,'2022-11-19 22:15:55.367998','2022-11-19 22:15:55.367998','싸피고등학교 6학년 5반','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_1f6c1254-78a5-4a27-accd-c2ff8278eb25.jpg','싸피고등학교','997bf68e-3473-44e2-815c-6140d822cd8b'),(6,'2022-11-19 22:23:00.309024','2022-11-19 22:23:00.309024','안녕하세요','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_73eb5a52-e2ba-4fff-b81e-3f2abf019828.jpg','싸피생활','b0413a70-f26b-4158-af1b-ec536c43d2a8'),(7,'2022-11-20 00:32:58.893389','2022-11-20 00:32:58.893389','햄보카다','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_98aed47d-5e79-4082-a8bc-4fb30f07db05.jpg','행복한 나무늘보','44450488-43e8-4619-a414-deaec2600b6a'),(8,'2022-11-20 18:27:39.350444','2022-11-20 18:27:39.350444','누구보다 빠르지','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_be05f213-780d-485e-a37b-8e0ee5ee4e38.jpg','나무늘보','a0d8b8f2-310e-4abf-adb8-daa953061cde'),(12,'2022-11-20 23:36:56.628923','2022-11-20 23:36:56.628923','우리 모두 화이팅합시다!','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_d4263235-4467-4e04-8543-7039d763e583.jpg','코딩하는 드림팀','3da98783-310c-43b6-bbba-4bc87a6cab5c'),(14,'2022-11-21 00:19:47.707696','2022-11-21 00:19:47.707696','매일 추억팔이만 한답니다','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_27906b96-18c2-4660-b4b4-7f65293f3149.jpg','추억팔이하는 동창회','31b61b7e-0618-40f0-95f8-9ad98a000150'),(15,'2022-11-21 00:22:38.534540','2022-11-21 00:22:38.534540','컴공 체크남방들 다 모여','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_b6eaec7e-6cdd-4d47-93fa-8d850886f15b.jpg','싸피대학교 컴공 21학번','ceba1641-ed38-4096-86d3-3f56aaf95a98'),(18,'2022-11-21 01:14:55.740282','2022-11-21 01:14:55.740282','싸피에 다니는 은평구 거주민이라면 오세요','https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/rn_image_picker_lib_temp_54706632-ee0f-403b-9371-4363745837ba.gif','은평구 모여라!','6dcacb6f-2d58-4932-a83d-80527a0d5253');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  9:30:09
