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
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'command',
            choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product', 'Quit']
        }
    ]).then(function(res) {
        switch(res.command) {
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

commands();