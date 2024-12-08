const { Router } = require('express');
const router = Router();

const AuthRoutes = require('./auth.routes.js');
const UserRoutes = require('./user.routes.js');
const ProductRoutes = require('./product.routes.js');
const OrderRoutes = require('./order.routes.js');
const BrandRoutes = require('./brand.routes.js');
const CategoryRoutes = require('./category.routes.js');
const CartRoutes = require('./cart.routes.js');

// --------------- ROUTE's INDEXING --------------- //

router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/cart', CartRoutes);
router.use('/brand', BrandRoutes);
router.use('/order', OrderRoutes);
router.use('/product', ProductRoutes);
router.use('/category', CategoryRoutes);



module.exports = router;
