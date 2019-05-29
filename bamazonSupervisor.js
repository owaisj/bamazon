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

//IIFE - Allow the user to immediately supervise
(function supervise(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'What would you like to do?',
            choices: [
                'Create a new department',
                'View total sales',
                'Exit'
            ]
        }
    ]).then(r => {
        switch (r.operation) {
            case 'Create a new department':
                return newDepartment();
            case 'View total sales':
                return viewSales();
            default: console.log('Thank you for using the Bamazon Supervising Suite');
        }
    }).catch();

})();

//Create new department
function newDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dname',
            message: 'What department are you adding?'
        },
        {
            type: 'number',
            name: 'ohc',
            message: 'What are its overhead costs?'
        }
    ]).then(r => {
        connection.query(
            `INSERT INTO departments (department_name, over_head_costs)
            VALUES ('${r.dname}', ${r.ohc})`,
            function (error, response) {
                if (error) throw error;
                connection.query(
                    `SELECT * FROM departments`,
                    function(error, response) {
                        if(error) throw error;
                        drawTable(response);
                        connection.end();
                    }
                )
            }
        )
    })
};

//View a summarized table of all sales by department
function viewSales() {
    connection.query(
        `SELECT departments.department_id, departments.department_name, departments.over_head_costs,
            COALESCE(SUM(products.product_sales), 0) AS product_sales,
            COALESCE(SUM(products.product_sales), 0) - over_head_costs AS total_profit
        FROM departments
        LEFT JOIN products
        ON departments.department_name = products.department_name
        GROUP BY departments.department_id
        ORDER BY total_profit DESC
        `,
        function (error, response) {
            if (error) throw error;
            //TODO: cli-table
            console.table(response);
            connection.end();
        }
    );
};

let drawTable = function(obj) {
    let table = new Table({
        style: {
            head: ['green']
        },
        head: ['Department ID', 'Department Name', 'Overhead Costs']
    })

    for (let i in obj) {
        let rowValues = [];
        Object.keys(obj[i]).forEach(item => {
            rowValues.push(obj[i][item]);
        });
        table.push(rowValues);
    }
    console.log(table.toString());
}