const { Router } = require("express");
const { check } = require("express-validator");
//
const { validFields } = require("../middlewares/valid-fields");
const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Correo no es válido").isEmail(),
    check("password", "La contraseña es olbligatoria").not().isEmpty(),
    validFields,
  ],
  login
);

module.exports = router;
