const { Schema, model } =  require('mongoose');

const UserSchema = new Schema({
    name : {
        type : String,
        default : 'User'
    
    },
    email : {
        type : String,
        required : true,
        unique : [true, "EMAIL_ALREADY_EXIST"],
        trim : true
    },
    salt : {
        type : Buffer,
        required : true,
        trim : true
    },
    password : {
        type : Buffer,
        required : true,
        trim : true
    },
    role : {
        type : String,
        trim : true,
        default : 'BUYER',
        enum: ['BUYER', 'SELLER', 'ADMIN']
    },
    addresses : {
        type : [Schema.Types.Mixed]
    }
},{timestamps : true});


const virtualId = UserSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

UserSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){
        delete ret._id;
    }
})

const UserModel = new model('User', UserSchema);

module.exports = UserModel