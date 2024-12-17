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
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY


app.use(expressSession({
    secret: 'smeacnriesthpdahsismwarnd',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));

app.use(passport.authenticate('session'));


passport.use('local', new LocalStrategy({ usernameField: 'email' },
    async function verify(username, password, done) {
        try {
            const user = await UserModel.findOne({ email: username });
            if (!user) return done(null, false, { status: 401, success: false, message: 'User Not Found, Please SignUp' });

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
            done(null, sanitizeUser(user.response));
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

app.use(express.raw({ type: 'application/json' }));
app.use(cors({ exposedHeaders: ['X-Total-Count'] }));
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));



const views = path.join(__dirname, 'views').split('src')[0] + "public/views";
// const assets = path.join(__dirname, 'assets').split('src')[0] + "\public\\assets";

app.set('views', views);
app.set('view engine', 'ejs');

app.use(cors('*'));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.static('build'));


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

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'inr',
        description: 'Export of 100 electronic devices to the USA. Order #12345',
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


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_bfcdcc2315aaa2965ad61a72b8353d06dc40d59e98c512dd24bb693decd5026d";

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`WEBHOOK ERROR : ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful !`);
            // handlePaymentIntentSucceeded(paymentIntent);
            break;

        case 'payment_intent.created':
            const paymentIntentSuccess = event.data.object;
            console.log(`PaymentIntent for ${paymentIntentSuccess.amount} was successful !!`);
            // handlePaymentIntentSucceeded(paymentIntent);
            break;

        case 'payment_intent.requires_action':
            const paymentIntentRequiresAction = event.data.object;
            console.log(`PaymentIntent requires additional action for payment ${paymentIntentRequiresAction.id}`);
            // Typically, you'd notify the frontend that the payment needs additional action (e.g., 3D Secure)
            // You may need to trigger the 3D Secure flow on your frontend or take other appropriate actions.
            // Example: redirect the user to a URL where they can complete the authentication.
            break;

        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log(`PaymentMethod ${paymentMethod.id} attached successfully!`);
            // handlePaymentMethodAttached(paymentMethod);
            break;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});


app.use('/api', indexRoutes);



createServer(app).listen(port, () => console.log(`Express listening on PORT :: ${port}`));




