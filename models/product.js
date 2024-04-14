const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Descripción es requerido"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  img: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...product } = this.toObject();
  return product;
};

module.exports = model("Product", ProductSchema);
