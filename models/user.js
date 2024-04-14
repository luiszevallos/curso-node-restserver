const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  surname: {
    type: String,
    required: [true, "Apellido es requerido"],
  },
  email: {
    type: String,
    required: [true, "Correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerido"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return {
    ...user,
    uid: _id,
  };
};

module.exports = model("User", UserSchema);
