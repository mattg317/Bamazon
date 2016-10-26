// connection.query("SELECT * FROM Product", function(err, res){
// 	if(err) throw err;
// 	for(var i=0, n=res.length; i<n; i++){
// 		console.log('ID '+res[i].ItemID);
// 		console.log('Item '+res[i].ProductName)
// 		console.log('Price '+res[i].Price)
// 		console.log('Amount left '+res[i].StockQuantity)
// 		console.log('--------------------')
// 	}

// })

// connection.query("SELECT * FROM Product", function(err, res){
// 	if(err) throw err;
// 	for(var i=0, n=res.length; i<n; i++){
// 		if(res[i].StockQuantity<5){
// 			console.log(res[i].ProductName + " is low quantity")
// 			console.log("There are only "+ res[i].StockQuantity + " left")
// 			console.log("-------------------")
// 		}
// 	}
// })


// var food = "Dog Food";
// var add = 6;

// connection.query("SELECT * FROM Product WHERE ProductName= ?", [food], function(err,res){
// 	if (err) throw err;
// 	console.log(res[0].StockQuantity);

// 		connection.query("UPDATE Product SET ? WHERE ?", [{
// 			StockQuantity: res[0].StockQuantity + add,
// 		},{
// 			ProductName: 'Dog Food'
// 		}], function(err, res){});
// })
