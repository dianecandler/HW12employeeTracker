INSERT INTO departments(departmentName) VALUES ('Marketing'), ('Engineering'), ('Finance'), ('Operations'), ('Service'), ('Sales');

INSERT INTO roles(roleTitle, roleSalary, departmentID) VALUES ('Director', 150000, 1), ('Director', 140000, 3), ('Director',160000, 2), 
('Vice President', 200000, 4),
('IC', 75000, 5), ('Vice President', 225000, 6);

INSERT INTO employees(employeeFirstName, employeeLastName, roleID) VALUES ('Diane','Candler',1), ('Kratu', 'Desai', 3), ('Cody', 'Code', 4),
('Robert', 'Can', 1),
('Antonio', 'Gage', 6),
('Walter', 'Perry', 4)