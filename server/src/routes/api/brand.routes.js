const { Router } = require('express');
const router = Router();

const { CreateBrand, ReadBrand } = require('../../controllers/brand.controller.js');
const { UpdateBrand, DeleteBrand } = require('../../controllers/brand.controller.js');


// ----------------- BRAND ROUTES --------------- //
router.post('/', CreateBrand).get('/', ReadBrand).patch('/:id', UpdateBrand).delete('/:id', DeleteBrand);

module.exports = router;

