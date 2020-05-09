let express = require('express');
let productService = require('./services/ProductService');

let app = express();
app.listen(3000);


app.get('/', function(req,res) {
	res.send('Home Page');
});

app.get('/products',(req,res) => {
	const products = new productService.productDetail().getProducts();
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify(products));
});

app.get('/products/:productName',(req,res) => {
	//console.log(req.params);
	if(req.params.productName.match("^[0-9]+$") || !req.params.productName.match("^[0-9a-zA-Z]+$") ) {
		//console.log('wrong product name');
		//res.sendStatus(400);
		res.status(400).send("Only Alphanumeric Product name is allowed");
	}
	else {
		const amount = new productService.productDetail().getProductAmount(req.params.productName);
		//console.log(amount);
		const result = {
			amount
		}
		if (amount) {
			//res.writeHead(200,{'Content-Type':'application/json'});
			res.send(result)
			//res.end(JSON.stringify(amount));
		}
		else {
			res.sendStatus(404);
		}
	}
});
