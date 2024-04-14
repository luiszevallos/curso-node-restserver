const validFields = require("./valid-fields");
const validRole = require("./valid-role");
const validJWT = require("./valid-jwt");
const validFile = require("./valid-file");

module.exports = {
  ...validFields,
  ...validJWT,
  ...validRole,
  ...validFile,
};
