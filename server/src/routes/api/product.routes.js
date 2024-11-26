const { Router } = require('express');
const router = Router();

const { CreateProduct, ReadProduct } = require('../../controllers/product.controller.js');
const { UpdateProduct, DeleteProduct } = require('../../controllers/product.controller.js');


// ----------------- PRODUCT ROUTES --------------- //
router.post('/', CreateProduct).get('/', ReadProduct).patch('/:id', UpdateProduct).delete('/:id', DeleteProduct);

module.exports = router;

