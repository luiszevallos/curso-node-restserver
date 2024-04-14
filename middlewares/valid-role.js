const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  const { user } = req;

  if (!["admin"].includes(user.role)) {
    return res.status(401).json({
      message: "Usuario no autorizado",
    });
  }

  next();
};

const authRole = (roles) => {
  return (req, res = response, next) => {
    const { user } = req;

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        message: "Usuario no autorizado",
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  authRole,
};
