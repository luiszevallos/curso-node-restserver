const { Router } = require("express");
const { check } = require("express-validator");
//
const { validFields } = require("../middlewares/valid-fields");
const {
  isRoleValid,
  emailExist,
  exitUserId,
} = require("../helpers/db-validator");

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsers);

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

validFields,
  router.put(
    "/:id",
    [
      check("id", "No es un ID valido").isMongoId(),
      check("id").custom(exitUserId),
      validFields,
    ],
    putUsers
  );

router.patch("/", patchUsers);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitUserId),
    validFields,
  ],
  deleteUsers
);

module.exports = router;
