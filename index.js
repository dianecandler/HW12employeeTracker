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
                case 'View roles?':
                    viewRoles();
                    break;
                case 'View employees?':
                    viewEmployees();
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
    });
}