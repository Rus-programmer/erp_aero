CREATE TABLE IF NOT EXISTS erp_aero.users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    login varchar(50) NOT NULL UNIQUE,
    hashed_password varchar(200) NOT NULL,
    password_changed_at TIMESTAMP NOT NULL DEFAULT (now()),
    created_at TIMESTAMP NOT NULL DEFAULT (now())
);