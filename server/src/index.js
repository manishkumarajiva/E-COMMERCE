require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const crypto = require('crypto');
const { sanitizeUser, generateToken } = require('./helpers/common.helper.js');
const UserModel = require('./models/user.model.js');

const DBconnection = require('./database/DBconnect.js');
const indexRoutes = require('./routes/version.js');

const app = express();
const port = process.env.PORT || 5555;

const SECRET_KEY = 'skeecyrset';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';



app.use(expressSession({
    secret: 'smeacnriesthpdahsismwarnd',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

app.use(passport.authenticate('session'));




passport.use('local', new LocalStrategy(
    async function verify(username, password, done) {
        try {
            const user = await UserModel.findOne({ email: username });

            if (!user) done(null, false, { status: 401, success: false, message: 'User Not Found, Please SignUp' });

            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                if (err) return done(err, false, null);

                if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                    return done(null, false, { message: 'Incorrect Username or Password' });
                }

                const userInfo = sanitizeUser(user)
                const token = await generateToken(userInfo);
                return done(null, { status: 201, success: true, message: 'Successfully LoggedIn', response: userInfo, token }, null);
            });
        } catch (error) {
            done(error)
        }
    }
));

passport.use('jwt', new JwtStrategy(
    opts,
    async function(jwt_payload, done) {
        try {
            const user = await UserModel.findById({ id: jwt_payload.sub });
            if (!user) return done(null, false);

            return done(null, token);
        } catch (error) {
            return done(err, false);
        }

    }));


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


app.use(cors({ exposedHeaders: ['X-Total-Count'] }));
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const views = path.join(__dirname, 'views').split('src')[0] + "public/views";
const assets = path.join(__dirname, 'assets').split('src')[0] + "\public\\assets";


app.set('views', views);
app.set('view engine', 'ejs');
app.use(express.static(assets));


app.get('/', function (req, res) {
    res.render('server');
})

app.use('/api', indexRoutes);



createServer(app).listen(port, () => console.log(`Express listening on PORT :: ${port}`));




