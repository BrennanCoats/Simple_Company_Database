const express = require('express');
const mysql = require('mysql2');
const path = require('path');
var inquirer = require('inquirer');
const fs = require("node:fs");
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use('/api', api);


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '0958',
      database: 'challenge12_db'
    },
    console.log(`Connected to the challenge12_db database.`)
  );

app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


  const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'openingQuestion',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees','add a department', 'add a role', 'add an employee','update an employee role'],
        },
      ])
      .then((answers) => {
        if (answers.openingQuestion === 'view all departments') {
          inquirer
            .prompt([
            ])
            .then((answers) => {
                console.log(`here are the departments`);
              })
            .then((answers) => {       
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                      });
            })
            .then((answers) => {
                promptUser()
              });
        } else if (answers.openingQuestion === 'view all roles') {
          inquirer
            .prompt([
            ])
            .then((answers) => {
              console.log(`here are the roles`);
            })
            .then((answers) => {       
                db.query('SELECT title FROM role', function (err, results) {
                    console.table(results);
                  });
            })
            .then((answers) => {
              promptUser()
            });
            
        } else if (answers.openingQuestion === 'view all employees') {
            inquirer
              .prompt([
                
              ])
              .then((answers) => {
                console.log(`here are the employees`);
              })
              .then((answers) => {       
                db.query('SELECT * FROM employee', function (err, results) {
                    console.table(results);
                  });
                })
                .then((answers) => {
                    promptUser()
                });
              
          } else if (answers.openingQuestion === 'add a department') {
            inquirer
              .prompt([
                {
                    type: "input",
                    name: "depname",
                    message: "Please enter the name of the department",
                },   
              ])
              .then(answers =>  {       
                db.query('INSERT INTO department(depname) VALUES (?);', answers.depname, (err, result) => {
                  });
                })
              .then((answers) => {
                console.log(`The department has been added to the database`);
              })
              .then((answers) => {
                promptUser()
              });
              
          } else if (answers.openingQuestion === 'add a role') {
            inquirer
              .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Please enter the name of the new role",
                },   
                {
                    type: "input",
                    name: "salary",
                    message: "Please enter the Salary for the new role",
                },
                {
                    type: "input",
                    name: "department_id",
                    message: "Please enter the department for the new role",
                },
              ])
              .then(answers =>  {       
                console.log(answers.title);
                db.query({sql: `INSERT INTO role (title, salary, department_id)
                VALUES
                ('${answers.title}', '${answers.salary}', '${answers.department_id}');`}, (err, result) => {
                    console.log(result);
                  })
                })
              .then(() => {
                console.log(`The new role has been added to the database`);
              })
              .then(() => {
                promptUser()
              });
        } else if (answers.openingQuestion === 'add an employee') {
            inquirer
              .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Please enter the first name of the employee",
                },   
                {
                    type: "input",
                    name: "last_name",
                    message: "Please enter the last name of the employee",
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "Please enter the role id for the employee",
                },
                {
                    type: "input",
                    name: "manager_id",
                    message: "Please enter the employee's manager id",
                },
              ])
              .then(answers =>  {       
                db.query({sql: `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
                VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}','${answers.manager_id}');`}, (err, result) => {
                    console.log(result);
                  })
                })
              .then((answers) => {
                console.log(`The employee has been added to the database`);
              })
              .then(() => {
                promptUser()
              });
        } else {
          inquirer
            .prompt([
            {
                type: "input",
                name: "employeeId",
                message: "Please enter the id of the employee you would like to make changes to",
            },  
            {
                type: "input",
                name: "first_name",
                message: "Please enter the first name of the employee",
            },   
            {
                type: "input",
                name: "last_name",
                message: "Please enter the last name of the employee",
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter the role id for the employee",
            },
            {
                type: "input",
                name: "manager_id",
                message: "Please enter the employee's manager id",
            },
            ])
            .then(answers =>  {       
              db.query({sql: `UPDATE employee SET(first_name, last_name, role_id, manager_id) WHERE id = ${answers.employeeId}
              VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}','${answers.manager_id}');`}, (err, result) => {
                  console.log(result);
                })
              })
            .then((answers) => {
                console.log(`The employee has been updated to the database`);
            })
            .then(() => {
              promptUser()
            });
        }
      })
    };



const init = () => {
    promptUser() 
};

init();
