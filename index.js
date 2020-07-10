const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'employeeTracker'
});

connection.connect(function (err) {
	if (err) throw err;
	console.log('connected thread ID: ' + connection.threadId);

	start();
});

function start () {
	inquirer
		.prompt({
			type: 'list',
			name: 'question',
			message: 'what do you want to do?',
			choices: [
				'View departments?',
				'View employee roles?',
				'View employees?',
				'Add department?',
				'Add employee role?',
				'Add employee?',
				'Update employee role?'
			]
		})
		.then(function (res) {
            console.log(res.question);
            switch(res.question){
                case 'View departments?':
                    viewDepartment();
                    break;
                case 'View employee roles?':
                    viewRoles();
                    break;
                case 'View employees?':
                    viewEmployees();
                    break;
                case 'Add department?':
                    addDepartment();
                    break;
                default:
                    connection.end();
            }
		});
}


function viewDepartment() {
    connection.query('SELECT * FROM departments', function(err, data){
        if (err) throw err;
		console.table(data);
		start();
    });
}
// order by can be changed to depart or roles title and salary
function viewRoles() {
	connection.query('SELECT roleTitle, roleSalary, departments.departmentName FROM employeetracker.roles LEFT JOIN employeetracker.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleSalary', function(err, data){
		if (err) throw err;
		console.table(data);
		start();
	});
}

function viewEmployees() {
	connection.query('SELECT employeeFirstName, employeeLastName, roleTitle, roleSalary, departments.departmentName FROM employeetracker.employees LEFT JOIN employeetracker.roles ON employees.roleID = roles.roleID LEFT JOIN employeetracker.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleTitle', function(err, data){
		if (err) throw err;
		console.table(data);
		start();
	});
}

function addDepartment() {
	inquirer.prompt({
		message: 'What department do you want to add?',
		type: 'input',
		name: 'departmentName'
	}).then(function(res){
		console.log(res.departmentName);
		connection.query(`INSERT INTO employeetracker.departments (departmentName) VALUES ('${res.departmentName}')`, function(err){
			if (err) throw err;
			viewDepartment();
			start();
		})
	});
}