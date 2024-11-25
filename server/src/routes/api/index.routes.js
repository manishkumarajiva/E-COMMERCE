const { Router } = require('express');
const router = Router();

const ProductRoutes = require('./product.routes.js');
const BrandRoutes = require('./brand.routes.js');
const CategoryRoutes = require('./category.routes.js');

// --------------- ROUTE's INDEXING --------------- //

router.use('/product', ProductRoutes);
router.use('/brand', BrandRoutes);
router.use('/category', CategoryRoutes);


module.exports = router;
