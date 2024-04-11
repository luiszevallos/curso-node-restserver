const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
  const existRole = await Role.findOne({ code: role });
  if (!existRole) {
    throw new Error("Rol no existe");
  }
};

const emailExist = async (email = "") => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error("Correo electrónico ya está registrado");
  }
};

const exitUserId = async (id) => {
  const existId = await User.findById(id);
  if (!existId) {
    throw new Error("El ID no existe");
  }
};

module.exports = {
  isRoleValid,
  emailExist,
  exitUserId,
};
