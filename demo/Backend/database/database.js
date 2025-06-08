
const mysql2 = require("mysql2");
require("dotenv").config();

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

module.exports = connection_database;