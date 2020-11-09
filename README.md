# Employee Tracker
:man::woman::man::man::older_woman::man::older_man::woman::boy::man::girl::woman::older_woman::boy:
## *MySQL application by Diane Candler*

## Links
* GitHub:  https://github.com/dianecandler/HW12employeeTracker
* :movie_camera:  Video:  https://pro.panopto.com/Panopto/Pages/Viewer.aspx?tid=024cd4d8-725f-4bed-b309-abfa0163074a

# About this Application
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. I was challenged to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.
  * Built a command line application
     * Add departments, roles, employees
     * View departments, roles, employees
     * Update employee roles
  * Designed database schema using 3 tables

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```


* Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

* You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

* Used a variety of SQL JOINS to complete this assignment.




# Thank you for visiting!

### View my Portfolio for more Applications
**https://dianecandler.herokuapp.com/**

- - -
© 2020 Diane Candler. All Rights Reserved.
