const { Router } = require('express');
const router = Router();

const { SignUpUser, SignInUser } = require('../../controllers/auth.controller.js');

// ------------------ AUTH ROUTES ------------------ //

router.post('/signup', SignUpUser).post("/signin", SignInUser);


module.exports = router;