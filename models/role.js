const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  code: {
    type: String,
    required: [true, "Código es requerido"],
  },
});

module.exports = model("Role", RoleSchema);
