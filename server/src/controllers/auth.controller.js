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
                if (err) return res.status(200).json({ status: 400, message: "Session Failed" });

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
    .cookie('token', req.user.token, {expires: new Date(Date.now() + 900000), httpOnly: false, secure : false, SameSite : 'None', path:'/', domain : 'localhost' })
    .json(req.user);
}


exports.CheckAuth = async (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.sendStatus(401);
    }
}










// exports.SignInUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await UserModel.findOne({ email : email });

//         if (!user) return res.status(200).json({ status: 400, success: false, message: 'User Not Found, Please SignUp' });
//         if(user.password !== password) return res.status(200).json({ status: 400, success: false, message: 'Incorrect Credentials' });

//         const payload = {
//             id : user.id,
//             email : user.email,
//             name : user.name,
//             addresses : user.addresses
//         }
//         res.status(200).json({ status: 201, success: true, message: 'Successfully LoggedIn', response: payload });

//     } catch (error) {
//         res.status(500).json({ status: 500, message: error.message, error: error.stack });
//     }
// }