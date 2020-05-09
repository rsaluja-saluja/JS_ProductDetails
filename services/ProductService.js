const notFoundError = require('./../errors/not-found-error');

class ProductService {

	constructor() {
		this.products = [
			{ "product_name": "product1", "amount": 100 },
			{ "product_name": "product2", "amount": 200 },
			{ "product_name": "product3", "amount": 300 },
			{ "product_name": "product4", "amount": 400 }]
	}

	async getProducts(amount) {
		if (amount) {
			return this.products.filter((product) => product.amount >= amount);
		} else {
			return this.products;
		}
	}

	async getProductAmount(productName) {
		const product = this.products.find((product) => product.product_name == productName);
		if(product) {
			return product.amount;
		} else {
			throw new notFoundError('Product Not Found Error', {
				location : `/products/${productName}`,
				issue		: 'Product not found'
			});
		};
	}

	async addProduct(product) {
		const index = this.products.findIndex((prod) => prod.product_name == product.product_name);
		if (index >= 0) {
			return null;
		} else {
			this.products.push(product);
			return this.products;
		}
	}

	async deleteProduct(productName) {
		const index = this.products.findIndex((product) => product.product_name == productName);
		if (index >= 0) {
			this.products.splice(index, 1);
			return this.products;
		} else {
				throw new notFoundError('Product Not Found Error', {
					location : `/products/${productName}`,
					issue		: 'Product not found'
				});
		}

	}

	async updateProduct(product) {
		const index = this.products.findIndex((prod) => prod.product_name == product.product_name);
		if (index >= 0) {
			this.products[index] = product;
			return this.products;
		} else {
			throw new notFoundError('Product Not Found Error', {
				location : `/products/${product.product_name}`,
				issue		: 'Product not found'
			});
		}
	}

}

module.exports.ProductService = ProductService;
