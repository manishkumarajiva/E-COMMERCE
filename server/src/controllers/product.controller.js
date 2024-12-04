const ProductModel = require('../models/product.model.js');

// ------------------- PRODUCT CONTROLLERS ------------------ //

exports.CreateProduct = async (req, res) => {
    try {
        const createResponse = await ProductModel.create(req.body);
        if (!createResponse) return res.status(200).json({ status: 401, message: 'Failed to Create' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Created', response: createResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}


exports.GetProductById = async(req, res) => {
    try {
        const createResponse = await ProductModel.findById(req.params.id);
        if (!createResponse) return res.status(200).json({ status: 401, message: 'Failed to Fetched' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Fetch', response: createResponse });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}


exports.GetProducts = async (req, res) => {
    try {

        let condition = {};
        if(!req.query.admin){
            condition.deleted = { $ne : true };
        }
        let query = ProductModel.find(condition);
        let productCount =  ProductModel.find(condition);

        // filter by category
        if (req.query.category) {
            query = query.find({ category: req.query.category });
            productCount = productCount.find({ category: req.query.category });
        }


        // filter by brand
        if (req.query.brand) {
            query = query.find({ brand: req.query.brand });
            productCount = productCount.find({ brand: req.query.brand });

        }

        // sorting
        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order });
        }


        if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit;
            const page = req.query._page;

            query = query.skip(pageSize * (page - 1)).limit(pageSize)
        }

        const getResponse = await query.exec();
        const totalProduct = await productCount.count();

        res.set('X-Total-Count', totalProduct);
    
        if (!getResponse) return res.status(200).json({ status: 401, message: 'Failed to Fetched' });

        res.status(200).json({ status: 200, success: true, message: 'Successfully Fetched', response: getResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}



exports.UpdateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const updateResponse = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateResponse) return res.status(200).json({ status: 401, message: 'Failed to Update' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Updated', response: updateResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}



exports.DeleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await ProductModel.findByIdAndDelete(id);
        if (!deleteResponse) return res.status(200).json({ status: 401, message: 'Failed to Delete' });

        res.status(200).json({ status: 201, success: true, message: 'Successfully Deleted', response: deleteResponse });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, error: error.stack });
    }
}


