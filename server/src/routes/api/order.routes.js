const { Router } = require('express');
const router = Router();

const { CreateOrder, GetUserOrder } = require('../../controllers/order.controller.js');

// -------------- Order Routes ------------- //
router.post('/', CreateOrder).get('/:id', GetUserOrder);

module.exports = router;