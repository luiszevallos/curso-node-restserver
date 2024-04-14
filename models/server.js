const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      users: "/api/users",
      uploads: "/api/uploads",
    };

    // DB Connect
    this.connectDB();

    // Middlewares
    this.middlewares();

    // routes app
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // parse body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));

    // file upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));

    this.app.use(this.paths.categories, require("../routes/category"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.products, require("../routes/product"));
    this.app.use(this.paths.users, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
