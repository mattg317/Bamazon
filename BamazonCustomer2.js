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
		console.log('Your total is: $'+res[0].Price*answers.units);
	}
	
})


})