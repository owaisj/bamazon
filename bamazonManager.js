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
                addInventory();
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

function addInventory() {
    connection.query(
        'SELECT * FROM products',
        function(error, response){
            console.table(response);
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'id',
                    message: 'Please enter the id of the item you\'d like to restock.'
                },
                {
                    type: 'number',
                    name: 'quantity',
                    message: 'How many would you like to add?'
                }
            ]).then(function(response){
                console.log(response.id);
                console.log(response.quantity);

                connection.query(
                    `UPDATE products SET stock_quantity = (stock_quantity + ${response.quantity}) WHERE item_id=${response.id}`,
                    function(error, response) {
                        if (error) throw error;
                        connection.query(`SELECT * FROM products`, 
                            function(error, response) {
                                if (error) throw error;
                                console.table(response);
                                connection.end();
                            }
                        );
                    }
                );
                
            }).catch();
        }
    );
}