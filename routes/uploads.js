const { Router } = require("express");
const { check } = require("express-validator");
//
const { validFields } = require("../middlewares/valid-fields");
//
const { postFileUpload } = require("../controllers/uploads");

const router = Router();

router.post("/", postFileUpload);

module.exports = router;
