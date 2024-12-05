const UserModel = require('../models/user.model.js');

// now user id is available in request stream. dont need send userid from frontend 

exports.GetUserById = async (req, res) => {
    console.log(req.user)
    try {
        const getResponse = await UserModel.findById(req.params.id);
        if (!getResponse) return res.status(200).json({ status: 401, message: 'Failed to Fetched' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Fetched', response: getResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}




exports.UpdateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updateResponse = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateResponse) return res.status(200).json({ status: 401, message: 'Failed to Update' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Updated', response: updateResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}



exports.DeleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await UserModel.findByIdAndDelete(id);
        if (!deleteResponse) return res.status(200).json({ status: 401, message: 'Failed to Delete' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Deleted', response: deleteResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}





