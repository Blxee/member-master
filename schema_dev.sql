CREATE USER IF NOT EXISTS 'mm_user_dev'@'%' IDENTIFIED BY 'good-password';

CREATE DATABASE IF NOT EXISTS membermaster_dev DEFAULT CHARACTER SET 'utf8';

CREATE TABLE IF NOT EXISTS membermaster_dev.users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(128),
  password VARCHAR(128),
  -- first_name VARCHAR(64),
  -- last_name VARCHAR(64),
  -- picture VARCHAR(128),
  -- phone VARCHAR(64),
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
  business_id INT NOT NULL,
  client_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  picture VARCHAR(128),
  email VARCHAR(64),
  phone VARCHAR(64),
  documents_dir VARCHAR(128),
  joined DATE,
  last_paid DATE,
  assurance BOOLEAN,
  PRIMARY KEY(business_id, client_id),
  FOREIGN KEY(business_id) REFERENCES membermaster_dev.businesses(id) ON DELETE CASCADE,
  FOREIGN KEY(client_id) REFERENCES membermaster_dev.users(id) ON DELETE CASCADE
);

GRANT ALL PRIVILEGES ON membermaster_dev.* TO 'mm_user_dev'@'%';
