const { Router } = require('express');
const router = Router();

const AuthRoutes = require('./auth.routes.js');
const ProductRoutes = require('./product.routes.js');
const BrandRoutes = require('./brand.routes.js');
const CategoryRoutes = require('./category.routes.js');
const CartRoutes = require('./cart.routes.js');

// --------------- ROUTE's INDEXING --------------- //

router.use('/auth', AuthRoutes);
router.use('/cart', CartRoutes);
router.use('/brand', BrandRoutes);
router.use('/product', ProductRoutes);
router.use('/category', CategoryRoutes);


module.exports = router;