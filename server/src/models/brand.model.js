const { Schema, model } = require('mongoose');


const BrandSchema = new Schema({
    label : { 
        type : String, 
        required : true, 
        unique : true,
        trim : true 
    },
    value : { 
        type : String, 
        required : true, 
        unique : true,
        trim : true
    }
}, { timestamps : true });


const virtualId = BrandSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

BrandSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){
        delete ret._id;
    }
})


const BrandModel = new model('Brand', BrandSchema);
module.exports = BrandModel;