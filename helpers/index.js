const DBValidator = require("./db-validator");
const generatorJWT = require("./generator-jwt");
const UploadFile = require("./upload-file");

module.exports = {
  ...DBValidator,
  ...generatorJWT,
  ...UploadFile,
};
