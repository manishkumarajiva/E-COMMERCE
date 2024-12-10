const { Router } = require('express');
const router = Router();

const { GetUserById, UpdateUser, DeleteUser } = require('../../controllers/user.controller.js');

// ----------------- BRAND ROUTES --------------- //

router.get("/", GetUserById).patch("/", UpdateUser).delete("/", DeleteUser);

module.exports = router;

