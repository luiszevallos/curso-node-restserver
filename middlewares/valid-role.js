const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  const { user } = req;

  if (user.role === "admin") {
    next();
  }

  return res.status(401).json({
    message: "Usuario no autorizado",
  });
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
