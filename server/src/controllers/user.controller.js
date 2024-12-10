const UserModel = require('../models/user.model.js');
const { sanitizeLoggedInUser } = require('../helpers/common.helper.js');


exports.GetUserById = async (req, res) => {
    const {id} = req.user.response;

    try {
        const getResponse = await UserModel.findById(id);
        if (!getResponse) return res.status(200).json({ status: 401, message: 'Failed to Fetched' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Fetched', response: sanitizeLoggedInUser(getResponse) });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}



exports.UpdateUser = async (req, res) => {
    const {id} = req.user.response;

    try {
        const updateResponse = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateResponse) return res.status(200).json({ status: 401, message: 'Failed to Update' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Updated', response: updateResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}



exports.DeleteUser = async (req, res) => {
    const {id} = req.user.response;

    try {
        const deleteResponse = await UserModel.findByIdAndDelete(id);
        if (!deleteResponse) return res.status(200).json({ status: 401, message: 'Failed to Delete' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Deleted', response: deleteResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}





