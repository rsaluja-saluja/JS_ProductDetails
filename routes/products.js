const express = require('express');
const productController = require('./ProductController');


function getRoutes() {
	const router = express.Router();
	const prodController = new productController();
	
	// router.get('/products',prodController.getProducts());
	// router.get('products/:productName',prodController.getProductAmount);

	router.get('/', prodController.getProducts.bind(prodController));
	router.get('/:productName', prodController.getProductAmount.bind(prodController));
	router.post('/', prodController.addProduct.bind(prodController));
	router.put('/', prodController.updateProduct.bind(prodController));
	router.delete('/:productName',prodController.deleteProduct.bind(prodController));
	
	return router;
}
 
module.exports.getRoutes = getRoutes;
