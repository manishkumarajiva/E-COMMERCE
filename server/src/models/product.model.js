const {Schema, model} = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String, 
      required: true, 
      unique: true
    },
    description: {
      type: String, 
      required: true
    },
    category: {
      type: String, 
      required: true
    },
    price: {
      type: Number, 
      required: true, 
      min: [0, "WRONG_MINIMUM_PRICE"]
    },
    discountPercentage: {
      type: Number, 
      required: true
    },
    discountPrice: {
      type: Number, 
      required: true
    },
    rating: {
      type: Number, 
      default: 0, 
      max: [6, "WRONG_MAXIMUM_RATING"]
    },
    stock: {
      type: Number, 
      required: true, 
      min: [0, "WRONG_MINIMUM_STOCK"]
    },
    brand: {
      type: String, 
      required: true
    },
    highlights: {
      type: [String], 
      required: true
    },
    images: {
      type: [String], 
      required: true
    },
    colors: {
      type: [String], 
      required: true
    },
    sizes: {
      type: [String], 
      required: true
    },
    thumbnail: {
      type: String, 
      required: true
    },
    deleted: {
      type: Boolean, 
      default: false
    },
  },
  {timestamps: true}
);


const virtualId = ProductSchema.virtual('id');

virtualId.get(function () {
  return this._id;
});

ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const ProductModel = new model("Product", ProductSchema);

module.exports = ProductModel;
