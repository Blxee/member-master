CREATE USER IF NOT EXISTS 'mm_user_dev'@'%' IDENTIFIED BY 'good-password';

CREATE DATABASE IF NOT EXISTS membermaster_dev DEFAULT CHARACTER SET 'utf8';

CREATE TABLE IF NOT EXISTS membermaster_dev.users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(128),
  password VARCHAR(128),
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS membermaster_dev.businesses (
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(256) NOT NULL,
  logo VARCHAR(128),
  address VARCHAR(256),
  PRIMARY KEY(id),
  FOREIGN KEY(owner_id) REFERENCES membermaster_dev.users(id) ON DELETE CASCADE
);

-- subscription: many to many relationship between a client and a business
CREATE TABLE IF NOT EXISTS membermaster_dev.subscriptions (
  client_id INT,
  business_id INT,
  joined DATE,
  last_paid DATE,
  assurance DATE,
  PRIMARY KEY(client_id, business_id),
  FOREIGN KEY(client_id) REFERENCES membermaster_dev.users(id) ON DELETE CASCADE,
  FOREIGN KEY(business_id) REFERENCES membermaster_dev.businesses(id) ON DELETE CASCADE
);

GRANT ALL PRIVILEGES ON membermaster_dev.* TO 'mm_user_dev'@'%';
