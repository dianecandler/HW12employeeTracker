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
			switch (res.question) {
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
				case 'Add employee role?':
					addRole();
					break;
				default:
					connection.end();
			}
		});
}

function viewDepartment () {
	connection.query('SELECT * FROM departments', function (err, data) {
		if (err) throw err;
		console.table(data);
		start();
	});
}
// order by can be changed to depart or roles title and salary
function viewRoles () {
	connection.query(
		'SELECT roleTitle, roleSalary, departments.departmentName FROM employeetracker.roles LEFT JOIN employeetracker.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleSalary',
		function (err, data) {
			if (err) throw err;
			console.table(data);
			start();
		}
	);
}

function viewEmployees () {
	connection.query(
		'SELECT employeeFirstName, employeeLastName, roleTitle, roleSalary, departments.departmentName FROM employeetracker.employees LEFT JOIN employeetracker.roles ON employees.roleID = roles.roleID LEFT JOIN employeetracker.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleTitle',
		function (err, data) {
			if (err) throw err;
			console.table(data);
			start();
		}
	);
}

function addDepartment () {
	inquirer
		.prompt({
			message: 'What department do you want to add?',
			type: 'input',
			name: 'departmentName'
		})
		.then(function (res) {
			console.log(res.departmentName);
			connection.query(
				`INSERT INTO employeetracker.departments (departmentName) VALUES ('${res.departmentName}')`,
				function (err) {
					if (err) throw err;
					viewDepartment();
					start();
				}
			);
		});
}
// use promise - with two parameters in funciton resolve or reject
// throw query to db for dept ID and dept name if error, resolve with
//

function departmentsInfo () {
	return new Promise(function (resolve, reject) {
		connection.query('SELECT * FROM departments', function (err, data) {
			if (err) throw err;
			resolve(data);
		});
	});
}

function addRole () {
	departmentsInfo().then(function (data) {
		console.log(data);
		let deptListNames = data.map((dept) => dept.departmentID);

		inquirer.prompt([
			{
				message: "What is the new role title?",
				type: "input",
				name: 'title'
			},
			{
				message: 'What is the employee salary?',
				type: 'number',
				name: 'salary'
			},
			{
				message: 'Which department do you want to add?',
				type: 'list',
				name: 'deptName',
				choices: deptListNames
			}
		]).then(function(res){
			connection.query(`INSERT INTO employeetracker.roles (roleTitle, roleSalary, departmentID) VALUES ('${res.title}', '${res.salary}', '${res.deptName}')`, function(err){
				if (err) throw err;
				viewRoles();
				start();
			});
		});
	});
}
