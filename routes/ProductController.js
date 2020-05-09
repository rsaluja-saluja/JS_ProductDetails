const productService = require('./../services/ProductService');
const badRequestError = require('./../errors/bad-request-error')

class ProductController {
	constructor() {
		 this.prodService = new productService.ProductService();
	}

	async getProducts(request, response) {
		console.log(request.query.amount);

		const products = await this.prodService.getProducts(request.query.amount);
	
		return response.json(products);
		//response.writeHead(200,{'Content-Type':'application/json'});
		//return response.(JSON.stringify(products));
	}

	async getProductAmount(req, res) {
		try {
			const productName = req.params.productName;
			this._validate((x) => x.match("^[0-9]+$"), productName,"Product name cant't be numeric only.");
			this._validate((x) => !x.match("^[0-9a-zA-Z]+$"), productName, "Product name can be alphanumeric only.");
			
			const amount = await this.prodService.getProductAmount(productName);
			//if(amount) {
				return res.json({amount});
			//} else {
			//	return res.status(404).send({Error: 'Product not found'});
			//}

		}
		catch(error) {
			switch(error.name) {
				case 'BadRequestError' :
					return res.status(400).send(error.details);
				case 'NotFoundError':
					return res.status(404).send(error.details);
			}
			// return res.status(400).send({Error: error.message});
		}

	}

async addProduct(req, res) {
		try {
			const product = req.body;
			this._validate((x) => x.match("^[0-9]+$"), product.product_name,"Product name cant't be numeric only.");
			this._validate((x) => !x.match("^[0-9a-zA-Z]+$"), product.product_name, "Product name can be alphanumeric only.");
			
			const products = await this.prodService.addProduct(product);
			if (products) {
				return res.json(products);
			} else {
				return res.status(409).send({Error: 'Product already exists'});
			}
			
		}
		catch(error) {
			// return res.status(400).send({Error: error.message});
			switch(error.name) {
					case 'BadRequestError' :
						return res.status(400).send(error.details);
			}
	
		}

	}
	
	async deleteProduct(req, res) {
		try {
			const productName = req.params.productName;
			this._validate((x) => x.match("^[0-9]+$"), productName,"Product name cant't be numeric only.");
			this._validate((x) => !x.match("^[0-9a-zA-Z]+$"), productName, "Product name can be alphanumeric only.");
			
			const products = await this.prodService.deleteProduct(productName);
//			if(products) {
				return res.json(products);
			// } else {
			// 	return res.status(404).send({Error: 'Product not found'});
			// }

		}
		catch(error) {
			// return res.status(400).send({Error: error.message});
			switch(error.name) {
					case 'BadRequestError' :
						return res.status(400).send(error.details);
					case 'NotFoundError':
						return res.status(404).send(error.details);
				}
	
		}

	}

	async updateProduct(req, res) {
		try {
			const product = req.body;
			this._validate((x) => x.match("^[0-9]+$"), product.product_name,"Product name cant't be numeric only.");
			this._validate((x) => !x.match("^[0-9a-zA-Z]+$"), product.product_name, "Product name can be alphanumeric only.");
			
			const products = await this.prodService.updateProduct(product);
			//if(products) {
				return res.json(products);
			// } else {
			// 	return res.status(404).send({Error: 'Product not found'});
			// }
		}
		catch(error) {
			// return res.status(400).send({Error: error.message});
			switch(error.name) {
					case 'BadRequestError' :
						return res.status(400).send(error.details);
					case 'NotFoundError':
						return res.status(404).send(error.details);
				}
	
		}


	}


	_validate(fnValidation,productName,message) {
		if(fnValidation(productName)) {
			//throw new Error(message);
			throw new badRequestError('Validation Error', {
				location : `/products/${productName}`,
				issue		: message
			});
		}
	}
}

module.exports = ProductController;