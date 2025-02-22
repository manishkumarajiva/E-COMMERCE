const CartModel = require('../models/cart.model.js');


// ------------------ CART's CONTROLLERS ---------------- //

exports.AddToCart = async (req, res) => {
    const {id} = req.user;
    const { product, quantity } = req.body;

    try {
        const payload = { user : id, product : product, quantity : quantity };

        const createResponse = await CartModel.create(payload);
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
    const {id} = req.user; 
    const {cartId, quantity} = req.body;

    try {
        const updateResponse = await CartModel.findOneAndUpdate({user : id, _id : cartId }, { quantity : quantity }, { new : true });
        if(!updateResponse) return res.status(200).json({ status : 400, success : false, message : 'Failed to Update' });
        
        const cartItems = await CartModel.find({user : updateResponse.user}).populate('product');
        res.status(200).json({ status : 201, success : true, message : 'Successfully Updated', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }    
}


exports.RemoveToCart = async (req, res) => {
    const {id} = req.params;
    
    try {
        const removed = await CartModel.findByIdAndDelete(id);
        if(!removed) return res.status(200).json({ status : 400, success : false, message : 'Failed to Remove' });
       
        const cartItems = await CartModel.find({user : removed.user}).populate('product');
        res.status(200).json({ status : 201, success : true, message : 'Successfully Removed', response : cartItems });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}