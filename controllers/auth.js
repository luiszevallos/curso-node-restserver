const bcrypt = require("bcryptjs");
//
const { User } = require("../models");
const { generatorJWT } = require("../helpers");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user?.status) {
      return res.status(400).json({
        message: "Correo / contraseña no son correctos",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Correo / contraseña no son correctos",
      });
    }

    const accessToken = await generatorJWT(user.id);

    res.json({
      message: "login",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    res.status(500).json({
      message: "Error interno",
    });
  }
};

module.exports = {
  login,
};
