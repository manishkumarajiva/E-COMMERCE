const { Router } = require('express');
const router = Router();

const { CreateOrder, GetAdminOrder, GetUserOrder, UpdateOrderStatus } = require('../../controllers/order.controller.js');

// -------------- Order Routes ------------- //
router.post('/', CreateOrder).get('/', GetAdminOrder).get('/', GetUserOrder).patch('/:id', UpdateOrderStatus);

module.exports = router;