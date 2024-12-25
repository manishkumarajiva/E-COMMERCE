const CartModel = require('../models/cart.model.js');
const mongoose = require('mongoose');
// ------------------ CART's CONTROLLERS ---------------- //

exports.AddToCart = async (req, res) => {
    try {
        const createResponse = await CartModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 400, message : 'Failed to Create' });

        const cartItems = await CartModel.find({user : req.body.user}).populate('product');
        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }    
}


exports.GetUserCart = async (req, res) => {
    const {id} = req.user;
    
    try {
        const cartItems = await CartModel.find({ user : id }).populate('product');
        if(!cartItems) return res.status(200).json({ status : 400, success : false, message : 'Failed to Fetched' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Fetched', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }        
}


exports.UpdateCart = async (req, res) => {
    const {id} = req.user.response; 
    const qty = req.body.quantity;

    try {
        const updateResponse = await CartModel.findByIdAndUpdate(id, { quantity : qty }, { new : true });
        if(!updateResponse) return res.status(200).json({ status : 400, success : false, message : 'Failed to Update' });
        
        const cartItems = await CartModel.find({user : updateResponse.user}).populate('product');
        res.status(200).json({ status : 201, success : true, message : 'Successfully Updated', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }    
}



exports.RemoveToCart = async (req, res) => {
    const {id} = req.user.response;

    try {
        const removed = await CartModel.findByIdAndDelete(id);
        if(!removed) return res.status(200).json({ status : 400, success : false, message : 'Failed to Remove' });
       
        const cartItems = await CartModel.find({user : removed.user}).populate('product');
        res.status(200).json({ status : 201, success : true, message : 'Successfully Removed', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}