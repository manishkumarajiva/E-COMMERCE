const UserModel = require('../models/user.model.js');
const crypto = require('crypto');
const { sanitizeUser } = require('../helpers/common.helper.js');
const jwt = require('jsonwebtoken');


exports.SignUpUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const isExist = await UserModel.findOne({ email: email });
        if (isExist) return res.status(200).json({ status: 400, success: false, message: 'Already Exist' });

        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedpassword) {
            if (err) return next(err);

            const user = new UserModel({ ...req.body, salt: salt, password: hashedpassword });
            const createResponse = await user.save();
            if (!createResponse) return res.status(200).json({ status: 400, success: false, message: 'Failed to Signup' });

            req.login(sanitizeUser(createResponse), async function (err) {
                if (err) return res.status(200).json({ status: 400, success : false, message: "Session Failed" });

                const user = sanitizeUser(createResponse)
                const token = jwt.sign(user, 'skeecyrset');
                res.status(200)
                .cookie('token', token, {expires: new Date(Date.now() + 900000), httpOnly: false, secure : false, SameSite : 'None', path : '/', domain : 'localhost' })
                .json({ status: 201, success: true, message: 'Register Successfully', response: user });
            })
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}


exports.SignInUser = async (req, res) => {   
    res.status(200)
    .cookie('token', req.user.token, {expires: new Date(Date.now() + (1 * 60 * 60 * 1000)), httpOnly: false, secure : false, SameSite : 'None', path:'/', domain : 'localhost' })
    .json(req.user);
}


exports.CheckAuth = async (req, res) => {
    if (req.user) {
        res.status(200).json({status : 200, success : true,  message : "Authorize", response : req.user})
    } else {
        res.sendStatus(401);
    }
}


exports.LogOutUser = async (req, res) => {
    try {
        // req.logout(function(err) {
            // if (err) { return next(err); }
            res.cookie('token', "", {expires: new Date(Date.now()), httpOnly: false, secure : false, SameSite : 'None', path : '/', domain : 'localhost' })
            .json({status : 200, login : false})
        //   });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
};

