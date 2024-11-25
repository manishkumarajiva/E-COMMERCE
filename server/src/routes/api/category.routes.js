const { Router } = require('express');
const router = Router();

const { CreateCategory, ReadCategory } = require('../../controllers/category.controller.js');
const { UpdateCategory, DeleteCategory } = require('../../controllers/category.controller.js');


// ----------------- CATEGORY ROUTES --------------- //
router.post('/', CreateCategory).get('/', ReadCategory).patch('/', UpdateCategory).delete('/', DeleteCategory);

module.exports = router;

