const CartModel = require('../models/cart.model.js');
const mongoose = require('mongoose');
// ------------------ CART's CONTROLLERS ---------------- //

exports.AddToCart = async (req, res) => {
    try {
        const createResponse = await CartModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, message : 'Failed to Create' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }    
}


exports.GetUserCart = async (req, res) => {
    const id = req.params.id;

    try {
        const cartItems = await CartModel.find({ user : id }).populate('product');
        if(!cartItems) return res.status(200).json({ status : 401, success : false, message : 'Failed to Fetched' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Fetched', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }        
}


exports.UpdateCart = async (req, res) => {
    const id = req.params.id 
    const qty = req.body.quantity;

    try {
        const createResponse = await CartModel.findByIdAndUpdate(id, { quantity : qty }, { new : true });
        if(!createResponse) return res.status(200).json({ status : 401, success : false, message : 'Failed to Update' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : createResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }    
}



exports.RemoveToCart = async (req, res) => {
    const id = req.params.id;

    try {
        const removed = await CartModel.findByIdAndDelete(id);
        
        if(!removed) return res.status(200).json({ status : 401, success : false, message : 'Failed to Remove' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Removed', response : removed });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}