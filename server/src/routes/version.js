const { Router } = require('express');
const router = Router();

const IndexRoutes = require('./api/index.js');

// ------------------ API's VERSION -------------- //

router.use('/v1', IndexRoutes);

module.exports = router;
