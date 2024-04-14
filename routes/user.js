const { Router } = require("express");
const { check } = require("express-validator");
//
const { validFields, authRole, validJWT } = require("../middlewares");
const { isRoleValid, emailExist, exitUserId } = require("../helpers");
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require("../controllers/user");

const router = Router();

router.get("/", [validJWT], getUsers);

router.post(
  "/",
  [
    check("name", "Nombre es requerido").not().isEmpty(),
    check("surname", "Apellido es requerido").not().isEmpty(),
    check("password", "Contraseña debe de ser mayor a 8 caracteres").isLength({
      min: 8,
    }),
    check("email", "Correo no es válido").isEmail(),
    check("email").custom(emailExist),
    check("role").custom(isRoleValid),
    validFields,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    validJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitUserId),
    validFields,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    validJWT,
    authRole(["admin"]),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitUserId),
    validFields,
  ],
  deleteUsers
);

module.exports = router;
