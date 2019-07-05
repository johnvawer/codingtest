CREATE DATABASE IF NOT EXISTS codingtest;

USE codingtest;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT, 
  `email` varchar(255) NOT NULL DEFAULT '',
  `given_name` varchar(25) NOT NULL DEFAULT '',
  `family_name` varchar(25) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;