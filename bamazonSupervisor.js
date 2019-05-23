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

function viewSales() {
    connection.query(
        `SELECT departments.department_id, departments.department_name, departments.over_head_costs,
        COALESCE(SUM(products.product_sales), 0) AS product_sales,
        COALESCE(SUM(products.product_sales), 0) - over_head_costs AS total_profit
        FROM departments
        LEFT JOIN products
        ON departments.department_name = products.department_name 
        `,
        function (error, response) {
            if (error) throw error;
            console.table(response);
            connection.end();
        }
    );
};

viewSales();