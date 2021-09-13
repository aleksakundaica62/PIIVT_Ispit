/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `weather_app`;
CREATE DATABASE IF NOT EXISTS `weather_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `weather_app`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`, `is_active`) VALUES
	(3, 'aleksa', '$2b$11$tIR2Nb6LubXdjsuheH.Npup/69Q6WJWVrR6zfcQ4rS/AV07nB/YKy', 1),
	(4, 'kunda', '$2b$11$k9bNBR0Z/YvrT3qTw.nVj.MfNwB1OyQ4xVxsZjNeapT.0g/t0jhlK', 1);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `city_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `country_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`city_id`),
  KEY `fk_city_country_id` (`country_id`),
  CONSTRAINT `fk_city_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`city_id`, `name`, `country_id`) VALUES
	(1, 'Belgrade', 1),
	(2, 'Novi Sad', 1),
	(3, 'Subotica', 1),
	(4, 'Zagreb', 2),
	(5, 'Ljubljana', 3),
	(6, 'Madrid', 4),
	(7, 'Valencia', 4),
	(8, 'San Paolo', 5);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `uq_country_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` (`country_id`, `name`) VALUES
	(5, 'Brazil'),
	(2, 'Croatia'),
	(8, 'Russia'),
	(1, 'Serbia'),
	(3, 'Slovenia'),
	(4, 'Spain');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;

DROP TABLE IF EXISTS `tempetature`;
CREATE TABLE IF NOT EXISTS `tempetature` (
  `tempetature_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `overview` enum('hours','days','weeks') DEFAULT NULL,
  `rain_percentige` int(10) unsigned NOT NULL,
  `wind_speed` int(10) unsigned NOT NULL,
  `cloud_level` enum('1','2','3','4') DEFAULT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `temperature` int(10) DEFAULT NULL,
  PRIMARY KEY (`tempetature_id`),
  KEY `fk_temperature_city_id` (`city_id`),
  CONSTRAINT `fk_temperature_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `tempetature` DISABLE KEYS */;
INSERT INTO `tempetature` (`tempetature_id`, `time`, `overview`, `rain_percentige`, `wind_speed`, `cloud_level`, `city_id`, `temperature`) VALUES
	(1, '2021-09-12 12:53:13', 'weeks', 2, 20, '1', 1, 21),
	(3, '2021-09-13 09:23:28', 'weeks', 2, 20, '1', 5, 21);
/*!40000 ALTER TABLE `tempetature` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
