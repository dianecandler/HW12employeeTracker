const mysql = require('mysql');
const inquirer = require('inquirer');

const connnection = mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
password: 'password',
database: 'employeeTracker'
});

