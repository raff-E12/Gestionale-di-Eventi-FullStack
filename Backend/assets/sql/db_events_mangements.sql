-- DB: Event Manager.
CREATE DATABASE IF NOT EXISTS db_events_manager;
USE db_events_manager;

CREATE TABLE `users` (
	`id` INTEGER AUTO_INCREMENT,
	`first_users` VARCHAR(255) NOT NULL,
	`last_users` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`phone` VARCHAR(255) UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`role` ENUM('admin', 'users') NOT NULL,
	`hash_key` TEXT(65535),
	`img_users` MEDIUMTEXT,
	PRIMARY KEY(`id`)
);


CREATE TABLE `location` (
	`id` INTEGER AUTO_INCREMENT,
	`location` VARCHAR(100) NOT NULL,
	`address` VARCHAR(255) NOT NULL,
	`city_events` VARCHAR(100),
	`descriptions_location` TEXT DEFAULT NULL,
	`location_img` MEDIUMTEXT,
	PRIMARY KEY(`id`)
);


CREATE TABLE `events` (
	`id` INTEGER AUTO_INCREMENT,
	`title_events` VARCHAR(200) NOT NULL,
	`descriptions_events` TEXT,
	`date_start` DATETIME NOT NULL,
	`date_end` DATETIME NOT NULL,
	`id_location` INTEGER,
	`users_id` INTEGER,
	PRIMARY KEY(`id`)
);


CREATE TABLE `bookings` (
	`id` INTEGER AUTO_INCREMENT,
	`id_events` INTEGER NOT NULL,
	`id_users` INTEGER NOT NULL,
	`date_booking` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`states` ENUM('confirm', 'is_pending', 'deleted') DEFAULT 'is_pending',
	PRIMARY KEY(`id`)
);


ALTER TABLE `events`
ADD FOREIGN KEY(`id_location`) REFERENCES `location`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `events`
ADD FOREIGN KEY(`users_id`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `bookings`
ADD FOREIGN KEY(`id_events`) REFERENCES `events`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `bookings`
ADD FOREIGN KEY(`id_users`) REFERENCES `users`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

SELECT * FROM events;
SELECT * FROM users;