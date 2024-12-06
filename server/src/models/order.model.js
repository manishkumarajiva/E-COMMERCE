const { Schema, model } = require('mongoose');

const paymentMethod = { values : ['CARD', 'CASH'], message : 'Validation Failed for Payment Methods' };

const OrderSchema = new Schema({
    items : { 
        type : [Schema.Types.Mixed],
        required : true
    },
    totalItems : {
        type : Number,
        required : true
    },
    totalAmount : {
        type : Number,
        required : true
    },
    paymentMethod : {
        type : String,
        trim : true,
        required : true,
        enum : paymentMethod
    },
    paymentStatus : {
        type : String,
        trim : true,
        default : 'PENDING',
        required : true
    },
    orderStatus : {
        type : String,
        trim : true,
        default : 'PENDING',
        required : true
    },
    shippingAddress : {
        type : Schema.Types.Mixed, 
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{ timestamps : true });


const virtualId = OrderSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

OrderSchema.set('toJSON', {
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){
        delete ret._id;
    }
})


const OrderModel = new model("Order", OrderSchema);
module.exports = OrderModel;