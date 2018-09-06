var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

function commands() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'command',
        choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product', 'Quit']
    }]).then(function (res) {
        switch (res.command) {
            case 'View products for sale':
                display();
                break;
            case 'View low inventory':
                low();
                break;
            case 'Add to inventory':
                addAmount();
                break;
            case 'Add new product':
                addProduct();
                break;
            case 'Quit':
                process.exit(-1);
        }
    })
}

function display() {
    connection.query('SELECT * FROM products', function (err, res) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        commands();
    })
}

function low() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        commands();
    })
}

function addAmount() {
    connection.query('SELECT * FROM products', function (err, res) {

        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        inquirer.prompt([{
                type: 'input',
                message: "What is the ID of the product you would like to replenish?",
                name: 'id',
                validate: function (input) {
                    if (isNaN(input) === false) {
                        return true;
                    } else if (isNaN(input) === true) {
                        console.log('\nYou need to provide an ID');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message: "How much would you like to add?",
                name: "amount",
                validate: function (input) {
                    if (isNaN(input) === false) {
                        return true;
                    } else if (isNaN(input) === true) {
                        console.log('\nYou need to provide a number');
                        return false;
                    }
                }
            }
        ]).then(function (response) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: parseInt(res[parseInt(response.id) - 1].stock_quantity) + parseInt(response.amount)
                },
                {
                    item_id: response.id
                }
            ], function (err, response) {
                if (err) throw err;
                display();
            });
        })
    });
}

function addProduct() {
    inquirer.prompt([{
            type: 'input',
            message: "What is the name of the item?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the department name?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price?",
            name: "price",
            validate: function (input) {
                if (isNaN(input) === false) {
                    return true;
                } else if (isNaN(input) === true) {
                    console.log('\nYou need to provide a number');
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "How many are you going to stock?",
            name: "stock",
            validate: function (input) {
                if (isNaN(input) === false) {
                    return true;
                } else if (isNaN(input) === true) {
                    console.log('\nYou need to provide a number');
                    return false;
                }
            }
        }
    ]).then(function (response) {
        var values = { product_name: response.name, department_name: response.department, price: response.price, stock_quantity: response.stock };
        connection.query("INSERT INTO products SET ?", values, function (err, res) {
            if (err) throw err;
            display();
        });
    })
}

commands();