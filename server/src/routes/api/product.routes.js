const { Router } = require('express');
const router = Router();

const { CreateProduct, GetProducts, GetProductById } = require('../../controllers/product.controller.js');
const { UpdateProduct, DeleteProduct } = require('../../controllers/product.controller.js');


// ----------------- PRODUCT ROUTES --------------- //
router.post('/', CreateProduct).get('/', GetProducts).get('/:id', GetProductById).put('/:id', UpdateProduct).patch('/:id', DeleteProduct);

module.exports = router;

