const jwt = require("jsonwebtoken");
const { response, request } = require("express");
//
const { User } = require("../models");

const validJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        message: "No hay token en la petición",
      });
    }

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(uid);

    if (!user || !user.status) {
      return res.status(401).json({
        message: "Token no válido - 1",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("🚀 ~ validJWT ~ error:", error);
    return res.status(401).json({
      message: "Token no válido - 2",
    });
  }
};

module.exports = {
  validJWT,
};
