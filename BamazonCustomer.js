var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "",
	database: 'mysql'
});

connection.connect(function(err){
	if(err) throw err;
	console.log('connection has id ' + connection.threadId);

});