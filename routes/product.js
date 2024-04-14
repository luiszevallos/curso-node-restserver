const { Router } = require("express");
const { check } = require("express-validator");
//
const { validJWT, validFields, authRole, isImage } = require("../middlewares");

const { exitProductId } = require("../helpers");
const {
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
  getProduct,
  postUploads,
  getUploads,
} = require("../controllers/product");

const router = Router();

// ? list categories
router.get("/", getProducts);

// ? details category :id
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitProductId),
    validFields,
  ],
  getProduct
);

// ? update product
router.put(
  "/:id",
  [
    validJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitProductId),
    validFields,
  ],
  putProduct
);

// ? add product
router.post(
  "/",
  [
    validJWT,
    check("name", "Nombre es obligatorio"),
    check("description", "Descripción es obligatorio"),
    check("category", "Categoría es obligatorio"),
    validFields,
  ],
  postProduct
);

// ? upload images product
router.put(
  "/uploads/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitProductId),
    isImage,
    validFields,
  ],
  postUploads
);

// ? View image
router.get(
  "/uploads/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitProductId),
    validFields,
  ],
  getUploads
);

// ? delete product :id
router.delete(
  "/:id",
  [
    validJWT,
    authRole(["admin"]),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exitProductId),
    validFields,
  ],
  deleteProduct
);

module.exports = router;
