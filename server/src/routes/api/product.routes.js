const { Router } = require('express');
const router = Router();

const { CreateProduct, GetProduct, GetProductById } = require('../../controllers/product.controller.js');
const { UpdateProduct, DeleteProduct } = require('../../controllers/product.controller.js');


// ----------------- PRODUCT ROUTES --------------- //
router.post('/', CreateProduct).get('/', GetProduct).get('/:id', GetProductById).patch('/:id', UpdateProduct).delete('/:id', DeleteProduct);

module.exports = router;

