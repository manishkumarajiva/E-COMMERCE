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
        const createResponse = await ProductModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.UpdateProduct = async (req, res) => {
    try {
        const createResponse = await ProductModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}



exports.DeleteProduct = async (req, res) => {
    try {
        const createResponse = await ProductModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


