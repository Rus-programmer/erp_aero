import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: 'mysql',
    user: process.env.DB_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD
});



export {pool}