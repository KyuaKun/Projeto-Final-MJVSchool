import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { environment } from "./config/environment";

import healthRoute from "./routes/healthRoute";

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.database();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  database() {
    mongoose
      .connect(environment.databaseURL)
      .then(() => console.log("DB connected"))
      .catch((error) => console.log(error));
  }

  routes() {
    this.app.use("/", healthRoute);
  }
}

export default new App().app;
