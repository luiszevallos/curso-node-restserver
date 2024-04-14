const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Nombre de categoría es requerido"],
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
});

CategorySchema.methods.toJSON = function () {
  const { __v, status, ...category } = this.toObject();
  return category;
};

module.exports = model("Category", CategorySchema);
