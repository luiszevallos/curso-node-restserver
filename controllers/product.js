const path = require("path");
const fs = require("fs");

// const cloudinary = require("cloudinary").v2;
const { ObjectId } = require("mongoose").Types;
//
const { uploadFile } = require("../helpers");
const { Product } = require("../models");

// * list de products
const getProducts = async (req, res) => {
  const { limit = 5, page = 0, search } = req.query;

  if (search) {
    let rows = [];
    let count = 0;
    const isMongoId = ObjectId.isValid(search);
    if (isMongoId) {
      const product = await Product.findById(search);
      if (product) {
        rows.push(product);
        count = 1;
      }
    } else {
      const regex = new RegExp(search, "i");
      const option = {
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }],
      };

      [count, rows] = await Promise.all([
        await Product.countDocuments(option),
        await Product.find(option)
          .skip(Number(page) * Number(limit))
          .limit(Number(limit))
          .populate("category", "name")
          .populate("user", ["name", "surname"]),
      ]);
    }

    res.json({
      data: {
        rows,
        count,
      },
    });
  } else {
    const option = {
      status: true,
    };

    const [count, rows] = await Promise.all([
      await Product.countDocuments(option),
      await Product.find(option)
        .skip(Number(page) * Number(limit))
        .limit(Number(limit))
        .populate("category", "name")
        .populate("user", ["name", "surname"]),
    ]);

    res.json({
      data: {
        count,
        rows,
      },
    });
  }
};

// * details product
const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("category", "name")
    .populate("user", ["name", "surname"]);

  res.json({
    data: product,
  });
};

// * create product
const postProduct = async (req, res) => {
  const { name: nameBody, description, category, price = 0 } = req.body;

  const name = nameBody.toUpperCase();

  const { user } = req;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.status(400).json({
      message: `El producto ${name} ya existe`,
    });
  }

  const product = new Product({
    name,
    description,
    category,
    price,
    user: user._id,
  });

  await product.save();

  res.status(201).json({
    message: `Producto creado exitoso!`,
    data: product,
  });
};

// * update product
const putProduct = async (req, res) => {
  const { id } = req.params;
  const { _id, name, ...data } = req.body;

  if (name) {
    data.name = name.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(id, data);

  res.json({
    message: "Producto actualizada exitosamente",
    data: product,
  });
};

// * create upload image LOCAL
const postUploads = async (req, res) => {
  try {
    const {
      files,
      params: { id },
    } = req;

    const product = await Product.findById(id);

    const folderName = "products";

    const nameFile = await uploadFile(files, folderName);

    if (product.img) {
      const pathImagen = path.join(
        __dirname,
        "../uploads/",
        folderName,
        product.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }

    product.img = nameFile;

    await product.save();

    res.status(201).json({
      message: "Archivo cargado exitoso",
      data: {
        uri: nameFile,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
    });
  }
};

// * get upload image
const getUploads = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    const folderName = "products";

    const placeholder = path.join(__dirname, "../uploads/placeholder.jpeg");

    if (product.img) {
      pathImage = path.join(__dirname, "../uploads/", folderName, product.img);

      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }

    res.sendFile(placeholder);
  } catch (error) {
    res.status(400).json({
      message: "Error! interno",
    });
  }
};

// * delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, { status: false });

  res.json({
    message: "Producto eliminada",
    data: product,
  });
};

module.exports = {
  postProduct,
  putProduct,
  deleteProduct,
  getProducts,
  getProduct,
  //
  postUploads,
  getUploads,
};
