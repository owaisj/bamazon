require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    database: 'bamazon'
});

function manage() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'What would you like to do?',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
            ]
        }
    ]).then(function(response){
        console.log(response);
    }).catch();
}

connection.query(
    'SELECT * FROM products',
    function(error, response){
        if (error) throw error;
        console.table(response);
        manage();
        connection.end();
    }
)