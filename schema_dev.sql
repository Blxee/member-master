CREATE USER IF NOT EXISTS 'mm_user'@'localhost' IDENTIFIED BY 'good-password';
CREATE DATABASE IF NOT EXISTS membermaster_dev DEFAULT CHARACTER SET 'utf8';
GRANT ALL PRIVILEGES ON membermaster_dev.* TO 'mm_user'@'localhost';
