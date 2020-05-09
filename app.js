const express = require('express');
const products = require('./routes/products');
const bodyParser = require('body-parser');

class App {
	constructor() {
		this.web = express();
	}

	//async 
	start() {
		this.web.use(bodyParser.json());
		this.web.use(bodyParser.urlencoded({extended : true}));
		this.web.use('/products',products.getRoutes());

		const port = 3000;
		this.web.listen(port);

		console.log(`Server listening on port: ${port}`);

	}
}

module.exports = App;