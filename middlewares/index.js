const validFields = require("./valid-fields");
const validRole = require("./valid-role");
const validJWT = require("./valid-jwt");

module.exports = {
  ...validFields,
  ...validJWT,
  ...validRole,
};
