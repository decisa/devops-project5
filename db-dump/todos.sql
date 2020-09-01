-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: project5db
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_completed` datetime DEFAULT NULL,
  `completed` tinyint unsigned NOT NULL DEFAULT '0',
  `sort_order` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (1,'Create React todo App','2020-08-22 10:00:45','2020-08-28 21:22:27',1,1),(2,'Upload to github','2020-08-22 10:06:20','2020-08-23 12:11:59',1,2),(3,'Deploy the App to AWS','2020-08-22 10:08:19',NULL,0,3),(4,'Add focus on task edit','2020-08-23 11:09:27','2020-08-28 21:22:31',1,4),(5,'Add Express.js backend routing','2020-08-27 23:50:45','2020-08-28 21:22:30',1,5),(20,'Add MySQL database to persist data','2020-08-28 21:17:07','2020-08-28 21:17:29',1,6),(21,'Containerize the App','2020-08-28 21:17:11',NULL,0,7),(22,'Upload images to Docker Hub','2020-08-28 21:45:20',NULL,0,7),(23,'Add Jenkins','2020-08-28 21:45:44',NULL,0,8),(24,'Add Linting code pipeline','2020-08-28 21:45:55',NULL,0,9),(25,'Build a docker container inside pipeline','2020-08-28 21:46:06',NULL,0,10),(26,'Docker container is deployed to K8s cluster','2020-08-28 21:46:45',NULL,0,11),(27,'Add blue/green or rolling deployment','2020-08-28 21:47:41',NULL,0,12),(28,'Extra: add additional pipelines other than linting','2020-08-28 21:48:11',NULL,0,13),(29,'Extra: Perform security scanning of Docker containers','2020-08-28 21:48:38',NULL,0,14),(30,'Extra: Post deployment testing of your application','2020-08-28 21:49:02',NULL,0,15),(32,'this is a no longer completed task 2','2020-08-30 15:37:12','2020-08-30 16:56:28',1,16);
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-30 23:27:44
