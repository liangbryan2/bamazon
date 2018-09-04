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

function display() {
    connection.query('SELECT * FROM products', function (err, res) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        customer();
    })
}

function customer() {
    inquirer.prompt([{
            type: 'input',
            message: "What is the ID of the product you would like to purchase?",
            name: 'id',
            validate: function(input) {
                if (isNaN(input) === true) {
                    console.log('\nYou need to provide a number');
                    return false;
                }
                else if (isNaN(input) === false) {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "amount",
            validate: function(input) {
                if (isNaN(input) === true) {
                    console.log('\nYou need to provide a number');
                    return false;
                }
                else if (isNaN(input) === false) {
                    return true;
                }
            }
        }
    ]).then(function (response) {
        buyItem(response.id, response.amount);
    })
}

function buyItem(id, amount) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, [{
        item_id: id
    }], function (err, res) {
        if (err) throw err;
        var item = res[0];
        var stock = item.stock_quantity;
        if (item.stock_quantity >= amount) {
            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{
                    stock_quantity: stock - amount
                },
                {
                    item_id: id
                }
            ], function (err, res) {
                if (err) throw err;
                console.log(`You have successfully purchased ${amount} ${item.product_name} for $${item.price * amount}.`);
                display();
            })
        } else {
            console.log("Invalid quantity!");
            display();
        }
    })
}
display();