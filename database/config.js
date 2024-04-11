const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);

    console.log("Base de datos en linea");
  } catch (error) {
    console.log("🚀 ~ dbConnection ~ error:", error);
    throw new Error("Error en iniciar base de datos");
  }
};

module.exports = {
  dbConnection,
};
