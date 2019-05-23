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

// (function supervise(){
//     inquirer.prompt().then().catch();

// })();

function newDepartment() {
    connection.query(
        `INSERT INTO departments (department_name, over_head_costs)
        VALUES ('Books', 100)`,
        function (error, response) {
            if (error) throw error;
        }
    )
};

//TODO: Take product_sales from products
function viewSales() {
    connection.query(
        `SELECT * FROM departments`,
        function (error, response) {
            if (error) throw error;
            console.table(response);
            connection.end();
        }
    );
};

viewSales();