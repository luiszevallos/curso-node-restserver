const isImage = (req, res, next) => {
  const files = req.files;

  if (!files || Object.keys(files).length === 0 || !files.file) {
    return res.status(400).send({
      message: "La imagen es obligatoria",
    });
  }

  const { file } = files;
  const fileName = file.name.split(".");
  const fileExt = fileName[fileName.length - 1];

  const allowedExtensions = ["jpg", "jpeg", "png"];

  if (!allowedExtensions.includes(fileExt)) {
    return res.status(400).json({
      message: `La extensión ${fileExt} no es permitida`,
    });
  }

  next();
};

module.exports = {
  isImage,
};
