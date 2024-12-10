const OrderModel = require('../models/order.model.js');


// ------------------- CATEGORY CONTROLLERS ------------------ //

exports.CreateOrder = async (req, res) => {
    const {id} = req.user.response;
    try {
        const createResponse = await OrderModel.create(req.body);
        if(!createResponse) return res.status(200).json({ status : 401, success : false, message : 'Failed to Create' });

        const orders = await OrderModel.find({user : id});
        res.status(200).json({ status : 201, success : true, message : 'Successfully Created', currOrder : createResponse, response : orders });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


exports.GetAdminOrder = async (req, res) => {
    const { id, _sort, _order, _page, _limit } = req.params;

    const query = OrderModel.find();
    const orderCount = OrderModel.find();

    // sorting
    if(_sort && _order){
        query = query.find().sort({ _sort : _order });
        orderCount = orderCount.find().sort({ _sort : _order });
    }

    // pagination
    if(_page && _limit){
        const pageSize = _limit;
        const page = _page;

        query = query.find().skip(pageSize*(page - 1)).limit(pageSize);
        orderCount = orderCount.find().skip(pageSize*(page - 1)).limit(pageSize);
    }

    try {
        const getResponse = await query.exec();
        const totalOrder = 66

        if(!getResponse) return res.status(200).json({ status : 401, success : false, message : 'Failed to Fetched' });

        res.status(200).json({ status : 200, success : true, message : 'Successfully Fetched', response : getResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


exports.GetUserOrder = async (req, res) => {
    const {id} = req.user.response;
    
    try {
        const getResponse = await OrderModel.find({ user : id });
        if(!getResponse) return res.status(200).json({ status : 401, success : false, message : 'Failed to Fetched' });

        res.status(200).json({ status : 200, success : true, message : 'Successfully Fetched', response : getResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


exports.UpdateOrderStatus = async (req, res) => {
    try {
        const updateResponse = await OrderModel.findByIdAndUpdate(req.params.id, { orderStatus : req.body.status}, {new : true});
        if(!updateResponse) return res.status(200).json({ status : 401, success : false, message : 'Failed to Update' });
       
        const getResponse = await OrderModel.find();
        res.status(200).json({ status : 201, success : true, message : 'Successfully Updated', response : getResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


exports.DeleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const deleteResponse = await OrderModel.findByIdAndDelete(id);
        if(!deleteResponse) return res.status(200).json({ status : 401, success : false, message : 'Failed to Delete' });

        res.status(200).json({ status : 201, success : true, message : 'Successfully Delete', response : deleteResponse });

    } catch (error) {
        res.status(500).json({ status : 500, message : error.message,  error : error.stack });
    }
}


