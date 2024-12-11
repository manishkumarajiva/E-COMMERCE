const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { SignUpUser, SignInUser, CheckAuth } = require('../../controllers/auth.controller.js');

// ------------------ AUTH ROUTES ------------------ //

router.post('/signup', SignUpUser)
router.post("/signin", passport.authenticate('local'), SignInUser)
router.get('/checkAuth', CheckAuth);


module.exports = router;