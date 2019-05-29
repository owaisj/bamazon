require('dotenv').config();
const inquirer = require('inquirer');
const Table = require('cli-table');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    database: 'bamazon'
});

function checkout() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Please enter the id of the item you\'d like to buy.'
        },
        {
            type: 'number',
            name: 'quantity',
            message: 'How many would you like?'
        }
    ]).then(function(response){
        let userQuantity = response.quantity;
        let userChoice = response.id;
        console.log(`You want ${userQuantity} of item no. ${userChoice}.`);
        connection.query(
            `SELECT * FROM products WHERE item_id=${userChoice}`,
            function(error, response) {
                if (error) throw error;

                if (userQuantity > response[0]['stock_quantity']) {
                    console.log(`Unfortunately we don't have enough. Please come again.`);
                    return connection.end();
                }

                let total = response[0]['price']*userQuantity;
                let sales = response[0]['product_sales'] + total;
                let newQuantity = response[0]['stock_quantity'] - userQuantity;
                console.log(`Your total was $${total}.`);
                connection.query(
                    `UPDATE products 
                    SET stock_quantity=${newQuantity}, product_sales=${sales} 
                    WHERE item_id=${userChoice}`,
                    function(error, response) {
                        if (error) throw error;
                        console.log('Thanks for your purchase!');
                        connection.end();
                    }
                )
            }
        )
    }).catch();
}

connection.query(
    'SELECT * FROM products',
    function(error, response){
        if (error) throw error;
        //Create new instance of Table
        const table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock', 'Product Sales']
        });
        //Loop through response object, create array of values and push to table array
        for (let index in response) {
            let rowValues = [];
            Object.keys(response[index]).forEach(item => {
                rowValues.push(response[index][item]);
            });
            table.push(rowValues);
        }
        console.log(table.toString());
        checkout();
        connection.end();
    }
)