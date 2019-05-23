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

(function supervise(){
    inquirer.prompt().then().catch();

})();

//TODO: Add a department, overhead costs is a dummy number
//TODO: Test with Books and Health
function newDepartment() {
    connection.query(
        ``,
        function (error, response) {
            if (error) throw error;
        }
    )
};

//TODO: Take product_sales from products
function viewSales() {
    connection.query(
        ``,
        function (error, response) {
            if (error) throw error;
        }
    );
};

