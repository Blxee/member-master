CREATE USER IF NOT EXISTS 'mm_user_dev'@'%' IDENTIFIED BY 'good-password';

CREATE DATABASE IF NOT EXISTS membermaster_dev DEFAULT CHARACTER SET 'utf8';

CREATE TABLE IF NOT EXISTS membermaster_dev.users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(256),
  password VARCHAR(256),
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS membermaster_dev.businesses (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(256) NOT NULL,
  logo VARCHAR(256),
  owner_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(owner_id) REFERENCES membermaster_dev.users(id)
);

CREATE TABLE IF NOT EXISTS membermaster_dev.business_clients (
  client_id INT,
  business_id INT,
  PRIMARY KEY(client_id, business_id),
  FOREIGN KEY(client_id) REFERENCES membermaster_dev.users(id),
  FOREIGN KEY(business_id) REFERENCES membermaster_dev.businesses(id)
);

GRANT ALL PRIVILEGES ON membermaster_dev.* TO 'mm_user_dev'@'%';
