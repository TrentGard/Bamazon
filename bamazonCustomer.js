var inquirer = require('inquirer');

var mysql = require('mysql');

require('console.table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

connection.connect(function(error){
	if (error) {
		console.error("Error connecting: " + error.stack);
	}
	loadProducts();
});

function loadProducts() {

	connection.query("SELECT * FROM products", function(error, result) {
		if (error) throw error;

		console.table(result);
		promptUserItem(result);
	});

}

function promptUserItem (inventory) {

	inquirer
		.prompt([
			{
				type: "input",
				name: "choice",
				message: "What is the ID of the item you would like to purchase? [Quit with Q]",
				validate: function(value) {
					return !isNaN(value) || value.toLowerCase() === "q";
					console.log("Invalid input!");
				}
			}
		])
		.then(function(value) {
			checkIfShouldExit(value.choice);
			var choiceId = parseInt(value.choice);
			var product = checkInventory(choiceId, inventory);

			if (product) {
				promptUserQuantity(product);
			}
			else {
				console.log("\nThat item is not in the inventory.");
				loadProducts();
			}
		});
}

function promptUserQuantity(product) {
	inquirer
		.prompt([
		{
			type: "input",
			name: "quantity",
			message: "How many would you like? [Quit with Q]",
			validate: function(value) {
				return value > 0 || value.toLowerCase() === "q";
			}
		}
		])
		.then(function(value) {
			checkIfShouldExit(value.quantity);
			var quantity = parseInt(value.quantity);

			if(quantity > product.stock_quantity) {
				console.log("\nInsufficient quantity!");
				loadProducts();
			}
			else {
				makePurchase(product, quantity);
			}
		});
}

function makePurchase(product, quantity) {
	connection.query(
		"UPDATE products SET stock_quantity - ? WHERE item_id = ?",
		[quantity, product.item_id],
		function(err, res) {
			console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "!");
		loadProducts();
	}
	);
}

function checkInventory (choiceId, inventory) {
	for (var i = 0; i <inventory.length; i++) {
		if (inventory[i].item_id === choiceId) {
			return inventory[i];
		}
	}

	return null;
}

function checkIfShouldExit(choice) {
	if (choice.toLowerCase() === "q") {
		console.log("Goodbye!");
		process.exit(0);
	}
}
