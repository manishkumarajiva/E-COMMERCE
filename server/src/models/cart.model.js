const { Schema, model } = require('mongoose');


const CartSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    quantity : {
        type : Number,
        default : 1,
        min : [1, 'MINIMUM_QTY_SHOULD_BE 1'],
        max : [5, 'MAXIMUM_QTY_SHOULD_BE 5']
    }
},{ timestamps : true });


const virtualId = CartSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

CartSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){
        delete ret._id;
    }
})

const CartModel = new model("Cart", CartSchema);

module.exports = CartModel;