const { Category } = require("../models");

// * list de categories
const getCategories = async (req, res) => {
  const { limit = 5, page = 0 } = req.query;

  const option = {
    status: true,
  };

  const [count, rows] = await Promise.all([
    await Category.countDocuments(option),
    await Category.find(option)
      .skip(Number(page) * Number(limit))
      .limit(Number(limit))
      .populate("user", ["name", "surname"]),
  ]);

  res.json({
    data: {
      count,
      rows,
    },
  });
};

// * details category
const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("user", [
    "name",
    "surname",
  ]);

  res.json({
    data: category,
  });
};

// * create category
const postCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const description = req.body.description;

  const { user } = req;

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      message: `la categoría ${name} ya existe`,
    });
  }

  const category = new Category({
    name,
    description,
    user: user._id,
  });

  await category.save();

  res.status(201).json({
    message: `Categoría creado exitoso!`,
    data: category,
  });
};

// * update category
const putCategory = async (req, res) => {
  const { id } = req.params;
  const { _id, name, ...data } = req.body;

  if (name) {
    data.name = name.toUpperCase();
  }

  const category = await Category.findByIdAndUpdate(id, data);

  res.json({
    message: "Categoría actualizada exitosamente",
    data: category,
  });
};

// * delete category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { status: false });

  res.json({
    message: "Categoría eliminada",
    data: category,
  });
};

module.exports = {
  postCategory,
  putCategory,
  deleteCategory,
  getCategories,
  getCategory,
};
