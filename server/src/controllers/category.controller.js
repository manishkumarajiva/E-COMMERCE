const CategoryModel = require('../models/category.model.js');

// ------------------- CATEGORY CONTROLLERS ------------------ //

exports.CreateCategory = async (req, res) => {
    try {

        const createResponse = await CategoryModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 400, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.ReadCategory = async (req, res) => {
    try {
        const getResponse = await CategoryModel.find({});
        if(!getResponse) return res.status(200).json({ status : 400, message : 'Failed to Fetched' });

        res.status(200).json({ status : 200, success : true, message : 'Successfully Fetched', response : getResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.UpdateCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const updateResponse = await CategoryModel.findByIdAndUpdate(id, req.body, {new : true});
        if(!updateResponse) return res.status(200).json({ status : 400, message : 'Failed to Update' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Updated', response : updateResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.DeleteCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await CategoryModel.findByIdAndDelete(id);
        if(!deleteResponse) return res.status(200).json({ status : 400, message : 'Failed to Delete' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Delete', response : deleteResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


