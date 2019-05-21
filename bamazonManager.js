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

(function manage() {
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
        switch (response.operation) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLow();
                break;
            case 'Add to Inventory':
                console.log('Add to Inventory');
                break;
            case 'Add New Product':
                console.log('Add New Product');
                break;
            default: console.log('Thanks for using the Bamazon Management Suite.');
        }
    }).catch();
})();

function viewProducts() {
    connection.query(
        'SELECT * FROM products',
        function(error, response){
            if (error) throw error;
            console.table(response);
            connection.end();
        }
    )
};

function viewLow() {
    connection.query(
        'SELECT * FROM products WHERE stock_quantity < 15',
        function(error, response){
            if (error) throw error;
            console.table(response);
            connection.end();
        }
    )
}