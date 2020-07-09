DROP DATABASE IF EXISTS employeeTracker;

CREATE DATABASE employeeTracker;

USE employeeTracker;

CREATE TABLE departments (
departmentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
departmentName VARCHAR (30) NOT NULL
);

CREATE TABLE roles (
    roleID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    roleTitle VARCHAR (30) NOT NULL,
    roleSalary DECIMAL (10,2) NOT NULL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES departments(departmentID)
);

CREATE TABLE employees (
    employeeID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    employeeFirstName VARCHAR (30) NOT NULL,
    employeeLastName VARCHAR (30) NOT NULL,
    roleID INT, 
    FOREIGN KEY (roleID) REFERENCES roles(roleID)
);