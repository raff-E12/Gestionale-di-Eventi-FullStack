import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config({path: "./assets/env/.env"});

const connection_database = mysql2.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`, 
    database: `${process.env.DB_NAME}`,
})

connection_database.connect((error) =>{
    if (error) throw error;
    return console.log(">> Connessione stabilità con il Database..")
})

export default connection_database