const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { SignUpUser, SignInUser, CheckAuth } = require('../../controllers/auth.controller.js');

// ------------------ AUTH ROUTES ------------------ //

router
.post('/signup', SignUpUser)
.post("/signin", passport.authenticate('local'), SignInUser)
.get('/check', CheckAuth );


module.exports = router;