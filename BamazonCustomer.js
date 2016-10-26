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

// connection.connect(function(err){
// 	if(err) throw err;
// 	console.log('connection has id ' + connection.threadId);

// });

// connection.query('SELECT * FROM Product', function(err, res){
// 	if(err) throw err;
// 	console.log(res[0]);
// })

var questions = [
{
	type: 'input',
	name: 'id',
	message: 'What is the ID of the product you would like to buy?'
},{
	type: 'input',
	name: 'units',
	message: 'how many units would you like to buy?'
}];

inquirer.prompt(questions).then(function(answers){


connection.query('SELECT * FROM Product WHERE ItemID = '+answers.id, function(err, res){
	
	if(err) throw err;

	var amntLeft = res[0].StockQuantity
	// console.log(amntLeft)

	if(answers.units > amntLeft){
		console.log('Insufficient quantity!')
	}else{
		connection.query("UPDATE Product SET ? WHERE ?", [{
			StockQuantity: amntLeft - answers.units
		},{
			ItemID: answers.id
		}], function(err, res){});
	}
	console.log('Your total is: $'+res[0].Price*answers.units);
})


})