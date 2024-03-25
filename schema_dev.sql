CREATE USER IF NOT EXISTS 'mm_user_dev'@'%' IDENTIFIED BY 'good-password';

CREATE DATABASE IF NOT EXISTS membermaster_dev DEFAULT CHARACTER SET 'utf8';

CREATE TABLE IF NOT EXISTS membermaster_dev.users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(256),
  password VARCHAR(256),
  PRIMARY KEY(id)
);

GRANT ALL PRIVILEGES ON membermaster_dev.* TO 'mm_user_dev'@'%';
