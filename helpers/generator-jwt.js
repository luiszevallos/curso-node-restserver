const jwt = require("jsonwebtoken");

const generatorJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          reject("No se puedo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generatorJWT,
};
