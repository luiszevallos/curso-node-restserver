const getUsers = (req, res) => {
  const { search, limit = 10, page = 0 } = req.query;

  res.json({
    message: "get users",
    search,
    limit,
    page,
  });
};

const postUsers = (req, res) => {
  const { name, surname } = req.body;

  res.json({
    message: `Usuario ${name} ${surname} creado exitoso!`,
  });
};

const putUsers = (req, res) => {
  const { id } = req.params;

  res.json({
    message: "put users",
    id,
  });
};

const patchUsers = (req, res) => {
  res.json({
    message: "patch users",
  });
};

const deleteUsers = (req, res) => {
  res.json({
    message: "delete users",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
