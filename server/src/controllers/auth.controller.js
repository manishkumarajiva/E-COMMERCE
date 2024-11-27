const UserModel = require('../models/user.model.js');
const { use } = require('../routes/version.js');


exports.SignUpUser = async (req, res) => {
    try {
        const createResponse = await UserModel.create(req.body);
        if (!createResponse) return res.status(200).json({ status: 401, success: false, message: 'Failed to Create' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Created', response: createResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}



exports.SignInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email : email });

        if (!user) return res.status(200).json({ status: 401, success: false, message: 'User Not Found, Please SignUp' });
        if(user.password !== password) return res.status(200).json({ status: 401, success: false, message: 'Incorrect Credentials' });

        const payload = {
            id : user.id,
            email : user.email,
            name : user.name,
            addresses : user.addresses
        }
        res.status(200).json({ status: 201, success: true, message: 'Successfully LoggedIn', response: payload });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}