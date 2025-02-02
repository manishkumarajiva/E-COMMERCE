const { Router } = require('express');
const router = Router();

const { AddToCart, RemoveToCart } = require('../../controllers/cart.controller.js');
const { GetUserCart, UpdateCart } = require('../../controllers/cart.controller.js');


// ----------------- CART ROUTES --------------- //

router.post('/', AddToCart).get("/", GetUserCart).patch('/', UpdateCart).delete('/:id', RemoveToCart);

module.exports = router;

