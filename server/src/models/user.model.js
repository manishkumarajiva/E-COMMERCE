const { Schema, model } =  require('mongoose');

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "EMAIL_ALREADY_EXIST"],
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        required : true,
        trim : true,
        enum: ['BUYER', 'SELLER', 'ADMIN']
    },
    addresses : {
        type : [Schema.Types.Mixed],
        required : true
    }
},{timestamps : true});


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

const UserModel = new model('User', UserSchema);

module.exports = UserModel