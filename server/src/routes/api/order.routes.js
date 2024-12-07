const { Router } = require('express');
const router = Router();

const { CreateOrder, GetAdminOrder, UpdateOrderStatus } = require('../../controllers/order.controller.js');

// -------------- Order Routes ------------- //
router.post('/', CreateOrder).get('/', GetAdminOrder).patch('/:id', UpdateOrderStatus);

module.exports = router;