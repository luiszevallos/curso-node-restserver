const { Router } = require("express");
const { check } = require("express-validator");
//
const { validJWT, validFields, authRole } = require("../middlewares");
const {
  postCategory,
  putCategory,
  deleteCategory,
  getCategories,
  getCategory,
} = require("../controllers/category");
const { exitCategoryId } = require("../helpers");

const router = Router();

// ? list categories
router.get("/", getCategories);

// ? details category :id
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitCategoryId),
  ],
  getCategory
);

// ? update category
router.put(
  "/:id",
  [
    validJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitCategoryId),
    validFields,
  ],
  putCategory
);

// ? add category
router.post(
  "/",
  [
    validJWT,
    check("name", "Nombre es obligatorio"),
    check("description", "Descripción es obligatorio"),
    validFields,
  ],
  postCategory
);

// ? delete category :id
router.delete(
  "/:id",
  [
    validJWT,
    authRole(["admin"]),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitCategoryId),
    validFields,
  ],
  deleteCategory
);

module.exports = router;
