import mysql from "mysql"

export const db = mysql.createConnection({
    host: "crud2.c9okwq4soeix.us-east-1.rds.amazonaws.com",
    user: "addirceu",
    password: "addirceu25",
    database: "crud2",
    port: 3306,    
});