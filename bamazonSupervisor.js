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

//TODO: Inquire user on what action they'd like to conduct
(function supervise(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'What would you like to do?',
            choices: [
                'Create a new department',
                'View total sales', //TODO: By department
                'Exit'
            ]
        }
    ]).then(r => {
        switch (r.operation) {
            case 'Create a new department':
                return console.log('A new inquiry will go here.');
            case 'View total sales':
                return viewSales();
            default: console.log('Thank you for using the Bamazon Supervising Suite');
        }
    }).catch();

})();

//Create new department x with overhead costs y
function newDepartment(x, y) {
    //TODO: New inquirer prompt, return query as part of promise
    inquirer.prompt().then().catch();
    
    connection.query(
        `INSERT INTO departments (department_name, over_head_costs)
        VALUES ('${x}', ${y})`,
        function (error, response) {
            if (error) throw error;
            console.table(response);
        }
    )
};

//TODO: Allow user to choose an individual department to view.
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
