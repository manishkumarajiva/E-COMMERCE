const { Router } = require('express');
const router = Router();

const { GetUserById, UpdateUser, DeleteUser } = require('../../controllers/user.controller.js');

// ----------------- BRAND ROUTES --------------- //

router.get("/:id", GetUserById).patch("/:id", UpdateUser).delete("/:id", DeleteUser);

module.exports = router;

