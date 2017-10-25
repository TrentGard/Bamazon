var inquirer = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

connection.connect(function(error){
	if (error) throw error;
	connection.query("SELECT item_id, product_name, price FROM products", function(error, result, fields){
		if (error) throw error;
		console.log(result);
	connection.end();
	});

function promptUserInput () {

	inquirer.prompt([
		name: 'ID'.
		type: 'list',
		message: 'Please select the item_id of the product you would like to purchase!',
		choices: function(){
			var userInputArray = [];
			for (var i = 0; i < result.length; i++) {
				userInputArray.push(result[i].item_id);
			}
			return userInputArray;
		},
		message: "How much would you like to bid?"
		},
		]).then(function() {
			if (userInput != item_id) {
				console.log("Invalid input!");
				return;
			}else{
				function(answer){
					var chosenID;
					//determine if userInput > price, if not, console.log("bid too low!") and return

				}
			}
		})
}

});
