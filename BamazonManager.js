var mysql = require('mysql');
var inquirer = require('inquirer')
var keys = require('./keys')


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: keys.keys.password,
	database: 'mysql'
});

connection.connect(function(err){
	if(err) throw err;
	console.log('connection has id ' + connection.threadId);
})



// connection.query("INSERT INTO Product SET ?",{
// 	ProductName: 'Pillows',
// 	DepartmentName: 'Home',
// 	Price: 50.00,
// 	StockQuantity: 14
// }, function(err, res){});

//ProductName, DepartmentName, Price, StockQuantity

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
},{
	type:'input',
	name: 'toAdd',
	message: 'What would you like to add more of?',
	when: function(answers){
		return "Add to Inventory"
	}},{
		type: 'input',
		name: 'amount',
		message: "How much would you like to add?",
		when: function(answers){
			return "Add to Inventory"
		}
}]

inquirer.prompt(questions).then(function(answers){
	console.log(answers.theme);
	console.log(answers.toAdd);
	console.log(answers.amount);
	var amount = parseInt(answers.amount);
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

		connection.query("SELECT * FROM Product WHERE ProductName= ?", [answers.toAdd], function(err,res){
			if (err) throw err;

				connection.query("UPDATE Product SET ? WHERE ?", [{
					StockQuantity: res[0].StockQuantity + amount,
				},{
					ProductName: answers.toAdd
				}], function(err, res){});
})



	}

})