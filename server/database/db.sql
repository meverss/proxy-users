CREATE USER 'squidadmin'@'localhost' IDENTIFIED BY 'squidadmin';
GRANT ALL ON squid.* TO 'squidadmin'@'localhost';

CREATE DATABASE IF NOT EXISTS squid;
USE squid;
CREATE TABLE IF NOT EXISTS passwd (
    id VARCHAR(21) DEFAULT NULL,
    user VARCHAR(45) DEFAULT NULL,
    password VARCHAR(160) DEFAULT NULL,
    enabled INT(1) DEFAULT 1,
    fullname VARCHAR(160) DEFAULT NULL,
    createdAt VARCHAR(100) DEFAULT NULL,
    updatedAt VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `passwd` (`id`, `user`, `password`, `enabled`, `fullname`, `createdAt`, `updatedAt`) VALUES ('5MWtG6KkG4GPO-unt12kj', 'admin', '$2b$10$BzyIKob.3yg9GZK.mL2ZlusDz450Gh8wC4OynNU68L2YruwFl9eFS', '1', 'Administrador', '02-04-2023.00:45:00', '02-04-2023.00:45:00');

-- Show ALL Users
SELECT * FROM passwd;

-- Show table structure
-- DESCRIBE squid;

-- Filter by USER or FULLNAME
-- SELECT * FROM passwd WHERE user = 'marvin' OR fullname like '%marvin%'
