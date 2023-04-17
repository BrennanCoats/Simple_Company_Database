INSERT INTO department (depname)
VALUES ("Sales"),
       ("Accounting"),
       ("IT"),
       ("Customer Service"),
       ("Quality Assurance"),
       ("Leadership");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Salesman", 55000, 001),
       (002, "Accountant", 75000, 002),
       (003, "IT Guy", 67000, 003),
       (004, "Customer Service Representative", 42000, 004),
       (005, "Quality Assurance Representative", 60000, 005),
       (006, "Computer Maintenence Professional", 35000, 003),
       (007, "Accounting intern", 35000, 002),
       (008, "Salesman's intern", 30000, 001),
       (009, "Operations Representative", 75000, 004),
       (010, "Payroll Representative", 60000, 002),
       (011, "Manager", 85000, 006);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Smith", 002, 011),
       (002, "Billy", "TheKid", 001, 011),
       (003, "Lebron", "James", 003, 011),
       (004, "Barack", "Obama", 004, 011),
       (005, "Donald", "Trump", 005, 011),
       (006, "Derek", "Jeter", 006, 011),
       (007, "Micheal", "Scott", 010, 011),
       (008, "Jim", "Halpert", 008, 011),
       (009, "Mike", "Tyson", 009, 011),
       (010, "Micheal", "Phelps", 010, 011), 
       (011, "Kelly", "Clarkson", 007, 011);
