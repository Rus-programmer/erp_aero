CREATE TABLE IF NOT EXISTS files (
    id                  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    filename            varchar(80)                    NOT NULL UNIQUE,
    extension           varchar(50)                    NOT NULL,
    mimetype            varchar(200)                   NOT NULL,
    size                int                            NOT NULL,
    created_at          TIMESTAMP                      NOT NULL DEFAULT (now())
);
