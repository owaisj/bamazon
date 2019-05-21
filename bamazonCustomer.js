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
                console.log(`Your total was $${total}.`);
                let newQuantity = response[0]['stock_quantity'] - userQuantity;
                connection.query(
                    `UPDATE products SET ? WHERE ?`,
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: userChoice
                        }
                    ],
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
        console.table(response);
        checkout();
    }
)