var mysql = require('mysql');
var inquirer = require('inquirer')
var keys = require('./keys')


var connection = mysql.createConnection({
	host: 'm7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	port: 3306,
	user: 'ptwhimauta9cnhee',
	password: 'a2xzzyq6wy4kf2o1',
	database: 'x0b2jmtssyuutb5d'
});

// connection.connect(function(err){
// 	if(err) throw err;
// 	console.log('connection has id ' + connection.threadId);
// })



// connection.query("INSERT INTO Product SET ?",{
// 	ProductName: 'Pillows',
// 	DepartmentName: 'Home',
// 	Price: 50.00,
// 	StockQuantity: 14
// }, function(err, res){});


//question to ask for what to do with the data base
var questions = [{
	type: 'list',
	name: 'theme',
	message: 'What would you like to do?',
	choices:[
		'View Products for Sale',
		'View Low Inventory',
		'Add to Inventory',
		'Add New Product'
	]
}];

//questoins for adding to inventory, take id number and how much to addd
var toDo=[{
	type:'input',
	name: 'toAdd',
	message: 'What is the ID number to add? ',
},
{
	type: 'input',
	name: 'amount',
	message: "How much would you like to add?",

}];


//questions for adding a product to the database, take all the paramters.
var addProduct=[{
	type: 'input',
	name: 'newProduct',
	message: 'What product would you like to add?'
},{
	type: 'input',
	name: 'amount',
	message: "How much are you adding?"
},{
	type: 'input',
	name: 'cost',
	message: 'How much does each item cost?',
},{
	type:'input',
	name: 'dept',
	message: "What department is it being added to? "
}];

inquirer.prompt(questions).then(function(answers){
	// console.log(answers.theme);
	// console.log(answers.newProduct);
	// console.log(answers.amount);
	
	if(answers.theme == 'View Products for Sale'){

		connection.query("SELECT * FROM Product", function(err, res){
			if(err) throw err;
			for(var i=0, n=res.length; i<n; i++){
				console.log('ID '+res[i].ItemID);
				console.log('Item '+res[i].ProductName)
				console.log('Price '+res[i].Price)
				console.log('Amount left '+res[i].StockQuantity)
				console.log('--------------------')
			}

		})//end
	}
	else if(answers.theme == 'View Low Inventory'){

		connection.query("SELECT * FROM Product", function(err, res){
			if(err) throw err;
			for(var i=0, n=res.length; i<n; i++){
				if(res[i].StockQuantity<5){
					console.log(res[i].ProductName + " is low quantity")
					console.log("There are only "+ res[i].StockQuantity + " left")
					console.log("-------------------")
				}
			}	
		})
	}
	else if(answers.theme=="Add to Inventory"){
		inquirer.prompt(toDo).then(function(answers){
			var amount = parseFloat(answers.amount);
			connection.query("SELECT * FROM Product WHERE ItemID= ?", [answers.toAdd], function(err,res){
				if (err) throw err;

					connection.query("UPDATE Product SET ? WHERE ?", [{
						StockQuantity: res[0].StockQuantity + amount,
					},{
						ItemID: answers.toAdd
					}], function(err, res){});
			})
		});
	}
	else if(answers.theme == "Add New Product"){
		inquirer.prompt(addProduct).then(function(answers){
			var amount = parseFloat(answers.amount);
			var cost = parseFloat(answers.cost);
			connection.query("INSERT INTO Product SET ?",{
				ProductName: answers.newProduct,
				DepartmentName: answers.dept,
				Price: cost,
				StockQuantity: amount
			}, function(err, res){});



		})

	}

})