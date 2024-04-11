const bcrypt = require("bcryptjs");
//
const User = require("../models/user");

const getUsers = async (req, res) => {
  const { limit = 5, page = 0 } = req.query;

  const option = {
    status: true,
  };

  // const users = await User.find(option).skip(Number(page)).limit(Number(limit));
  // const count = await User.countDocuments(option);

  const [count, rows] = await Promise.all([
    await User.countDocuments(option),
    await User.find(option)
      .skip(Number(page) * Number(limit))
      .limit(Number(limit)),
  ]);

  res.json({
    data: {
      count,
      rows,
    },
  });
};

const postUsers = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  const user = new User({
    name,
    surname,
    email,
    password,
    role,
  });

  // scrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({
    message: `Usuario ${name} ${surname} creado exitoso!`,
    data: user,
  });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { password, google, email, _id, ...data } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    data.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);

  res.json({
    message: "Usuario actualizado exitoso",
    data: user,
  });
};

const patchUsers = (req, res) => {
  res.json({
    message: "patch users",
  });
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  // const user = await User.findByIdDelete(id)

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    message: "Usuarios eliminado",
    data: user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
