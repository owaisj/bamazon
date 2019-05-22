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

//TODO: Write out catch blocks
//TODO: Validation functions
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
            return viewProducts();
            
            case 'View Low Inventory':
            return viewLow();

            case 'Add to Inventory':
            return addInventory();
            
            case 'Add New Product':
            return addNewItem();
            
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
            if (error) throw error;
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

function addNewItem() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'pname',
            message: 'What would you like to add?'
        },
        {
            type: 'input',
            name: 'dname',
            message: 'What department does this belong in?'
        },
        {
            type: 'number',
            name: 'price',
            message: 'How much does it cost?'
        },
        {
            type: 'number',
            name: 'quantity',
            message: 'How much do we have available to sell?'
        }
    ]).then(function(newproduct){
        console.table(newproduct);
        connection.query(
            `INSERT INTO products (product_name, department_name, price, stock_quantity) 
            VALUES ('${newproduct.pname}', '${newproduct.dname}', ${newproduct.price}, ${newproduct.quantity})`,
            function(error, response) {
                if (error) throw error;
                connection.end();
            }
        );
    }).catch();
}