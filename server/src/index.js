require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var cookieParser = require('cookie-parser')
const crypto = require('crypto');
const { sanitizeUser } = require('./helpers/common.helper.js');
const UserModel = require('./models/user.model.js');
const { cookieExtractor } = require('./helpers/common.helper.js');
const DBconnection = require('./database/DBconnect.js');
const indexRoutes = require('./routes/version.js');

const app = express();
const port = process.env.PORT || 5555;

const SECRET_KEY = 'skeecyrset';

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY



app.use(cors({ 
    origin : ['http://localhost:3000'],
    methods : ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    credentials : true,
    exposedHeaders: ['X-Total-Count'] 
}));

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'smeacnriesthpdahsismwarnd',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: 'None'
    }
}));

const views = path.join(__dirname, 'views').split('src')[0] + "public/views";
// const assets = path.join(__dirname, 'assets').split('src')[0] + "\public\\assets";

app.set('views', views);
app.set('view engine', 'ejs');


app.use(passport.authenticate('session'));

passport.use('local', new LocalStrategy({ usernameField: 'email' },
    async function verify(username, password, done) {
        try {
            const user = await UserModel.findOne({ email: username });
            if (!user) return done(null, false, { status: 400, success: false, message: 'User Not Found, Please SignUp' });

            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                if (err) return done(err, false, null);

                if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                    return done(null, false, { message: 'Incorrect Username or Password' });
                }

                const userinfo = sanitizeUser(user);
                const token = jwt.sign(userinfo, SECRET_KEY);
                return done(null, { status: 201, success: true, message: 'Successfully LoggedIn', response: userinfo, token }, null);
            });
        } catch (error) {
            done(error)
        }
    }
));

passport.use('jwt', new JwtStrategy(
    opts,
    async function (jwt_payload, done) {        
        try {
            const user = await UserModel.findById(jwt_payload.id);
            if (!user) return done(null, false);
            done(null, sanitizeUser(user));
        } catch (error) {
            done(error, false);
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






app.get('/', function (req, res) {
    res.render('server');
})

const stripe = require("stripe")('sk_test_51NNEtiSGYebLfg1r1eKaQEW2qfgXnWQQjhsFUpP3AFahy6b2Iu8DsvKBFiONa6OKe6rblOYpfctfzMTRiUHwwd5b00ZF6kuLfd');

const calculateOrderAmount = (items) => {
    let total = 500;
    return total;
};

app.post("/create-payment-intent", async (req, res) => {
    const items = req.body.items;

    console.log(items)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'inr',
        metadata: {
            order_id: '12345',
            customer_email: 'customer@example.com'
        },
        automatic_payment_methods: {
            enabled: true,
        }
    });

    res.send({ clientSecret: paymentIntent.client_secret });
});



app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    response.send();
  });

app.use('/api', indexRoutes);



createServer(app).listen(port, () => console.log(`Express listening on PORT :: ${port}`));




