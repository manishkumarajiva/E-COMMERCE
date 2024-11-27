const { Schema, model } = require('mongoose');


const CategorySchema = new Schema({
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


const virtualId = CategorySchema.virtual('id');
virtualId.get(function(){
    return this._id;
})


CategorySchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){
        delete ret._id;
    }
})


const CategoryModel = new model('Category', CategorySchema);
module.exports = CategoryModel;