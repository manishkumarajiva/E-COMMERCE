const { Schema, model } = require('mongoose');


const OrderSchema = new Schema({

},{ timestamps : true });


const OrderModel = new model("Order", OrderSchema);