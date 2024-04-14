const { response } = require("express");
const { uploadFile } = require("../helpers");
//

const postFileUpload = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No hay archivo que subir.");
    return;
  }

  try {
    const validExt = ["png", "jpg", "jpeg", "gif"];

    const nameFile = await uploadFile(req.files, validExt);
    res.status(201).json({
      message: "Archivo cargado exitoso",
      data: {
        uri: nameFile,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  postFileUpload,
};
