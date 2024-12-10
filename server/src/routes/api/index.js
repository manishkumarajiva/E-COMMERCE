const { Router } = require('express');
const router = Router();

const AuthRoutes = require('./auth.routes.js');
const UserRoutes = require('./user.routes.js');
const ProductRoutes = require('./product.routes.js');
const OrderRoutes = require('./order.routes.js');
const BrandRoutes = require('./brand.routes.js');
const CategoryRoutes = require('./category.routes.js');
const CartRoutes = require('./cart.routes.js');

const { isAuthToken } = require('../../middlewares/isAuth.middleware.js')

// --------------- ROUTE's INDEXING --------------- //

router.use('/auth', AuthRoutes);
router.use('/user', isAuthToken, UserRoutes);
router.use('/cart', isAuthToken, CartRoutes);
router.use('/brand', isAuthToken, BrandRoutes);
router.use('/order', isAuthToken, OrderRoutes);
router.use('/product', isAuthToken, ProductRoutes);
router.use('/category', isAuthToken, CategoryRoutes);



module.exports = router;
