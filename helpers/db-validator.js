const { Role, User, Category, Product } = require("../models");

const isRoleValid = async (role = "") => {
  const existRole = await Role.findOne({ code: role });
  if (!existRole) {
    throw new Error("Rol no existe");
  }
  return true;
};

const emailExist = async (email = "") => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error("Correo electrónico ya está registrado");
  }
  return true;
};

const exitUserId = async (id) => {
  const user = await User.findById(id);
  if (!user || !user.status) {
    throw new Error("El ID no existe");
  }
  return true;
};

const exitCategoryId = async (id) => {
  const category = await Category.findById(id);
  if (!category || !category.status) {
    throw new Error("El ID no existe");
  }
  return true;
};

const exitProductId = async (id) => {
  const product = await Product.findById(id);
  if (!product || !product.status) {
    throw new Error("El ID no existe");
  }
  return true;
};

module.exports = {
  isRoleValid,
  emailExist,
  exitUserId,
  exitProductId,
  //
  exitCategoryId,
};
