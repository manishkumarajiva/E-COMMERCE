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
const passport = require('passport');
// --------------- ROUTE's INDEXING --------------- //

router.use('/auth', AuthRoutes);
router.use('/user', passport.authenticate('jwt'), UserRoutes);
router.use('/cart', passport.authenticate('jwt'), CartRoutes);
router.use('/brand', passport.authenticate('jwt'), BrandRoutes);
router.use('/order', passport.authenticate('jwt'), OrderRoutes);
router.use('/product', passport.authenticate('jwt'), ProductRoutes);
router.use('/category', passport.authenticate('jwt'), CategoryRoutes);



module.exports = router;
