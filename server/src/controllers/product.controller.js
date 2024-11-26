const ProductModel = require('../models/product.model.js');

// ------------------- PRODUCT CONTROLLERS ------------------ //

exports.CreateProduct = async (req, res) => {
    try {     
        const createResponse = await ProductModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.ReadProduct = async (req, res) => {
    
    try {
        const getResponse = await ProductModel.find({});
        if(!getResponse) return res.status(200).json({ status : 401, message : 'Failed to Fetched' });

        res.status(200).json({ status : 200, success : true, message : 'Successfully Fetched', response : getResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.UpdateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const updateResponse = await ProductModel.findByIdAndUpdate(id, req.body, {new : true});
        if(!updateResponse) return res.status(200).json({ status : 401, message : 'Failed to Update' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Updated', response : updateResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.DeleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await ProductModel.findByIdAndDelete(id);
        if(!deleteResponse) return res.status(200).json({ status : 401, message : 'Failed to Delete' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Delete', response : deleteResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


