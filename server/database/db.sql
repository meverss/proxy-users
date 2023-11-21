CREATE DATABASE IF NOT EXISTS squid;
USE squid;
CREATE TABLE IF NOT EXISTS passwd (
    id INT(11) AUTO_INCREMENT,
    user VARCHAR(45) DEFAULT NULL,
    password VARCHAR(160) DEFAULT NULL,
    enabled INT(1) DEFAULT 1,
    fullname VARCHAR(160) DEFAULT NULL,
    createdAt VARCHAR(100) DEFAULT NULL,
    updatedAt VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `passwd` (`id`, `user`, `password`, `enabled`, `fullname`, `createdAt`, `updatedAt`) VALUES (1, 'admin', SHA1('admin'), '1', 'Administrador', NULL, NULL);

-- Show ALL Users
SELECT * FROM passwd;

-- Filter by USER or FULLNAME
SELECT * FROM passwd WHERE user = 'marvin' OR fullname like '%marvin%'

-- Show table structure
DESCRIBE squid;

CREATE USER 'marvin'@'localhost' IDENTIFIED BY 'mes2**';
GRANT ALL ON [nombre de base de dato].[nombre de tabla] TO '[nombre usuario]'@'origen acceso';