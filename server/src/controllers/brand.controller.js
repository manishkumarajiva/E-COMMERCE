const BrandModel = require('../models/brand.model.js');

// ------------------- CATEGORY CONTROLLERS ------------------ //

exports.CreateBrand = async (req, res) => {
    const { label, value } = req.body;
    try {

        const createResponse = await BrandModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.ReadBrand = async (req, res) => {
    try {
        const getResponse = await BrandModel.find({});
        if(!getResponse) return res.status(200).json({ status : 401, message : 'Failed to Fetched' });

        res.status(200).json({ status : 200, success : true, message : 'Successfully Fetched', response : getResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.UpdateBrand = async (req, res) => {
    const id = req.params.id;
    try {
        const updateResponse = await BrandModel.findByIdAndUpdate(id, req.body, {new : true});
        if(!updateResponse) return res.status(200).json({ status : 401, message : 'Failed to Update' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Updated', response : updateResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.DeleteBrand = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await BrandModel.findByIdAndDelete(id);
        if(!deleteResponse) return res.status(200).json({ status : 401, message : 'Failed to Delete' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Delete', response : deleteResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


