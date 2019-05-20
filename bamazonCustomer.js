require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    database: 'bamazon'
});

connection.query(
    'SELECT * FROM products',
    function(error, response){
        if (error) throw error;
        console.table(response);
        connection.end();
    }
)