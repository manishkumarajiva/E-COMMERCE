const { Router } = require('express');
const router = Router();

const { CreateCategory, ReadCategory } = require('../../controllers/category.controller.js');
const { UpdateCategory, DeleteCategory } = require('../../controllers/category.controller.js');


// ----------------- CATEGORY ROUTES --------------- //
router.post('/', CreateCategory).get('/', ReadCategory).patch('/:id', UpdateCategory).delete('/:id', DeleteCategory);

module.exports = router;

