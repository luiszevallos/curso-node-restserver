const path = require("path");
//
const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, folderName = "others") => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const fileName = file.name.split(".");
    const fileExt = fileName[fileName.length - 1];

    const currentFileName = `${uuidv4()}.${fileExt}`;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folderName,
      currentFileName
    );

    file.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }

      resolve(currentFileName);
    });
  });
};

module.exports = {
  uploadFile,
};
