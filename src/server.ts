import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { environment } from "./config/environment";

//Routes
import healthRoute from "./routes/healthRoute";
import ChampionRoute from "./routes/ChampionRoute";
import UserRoute from "./routes/UserRoute";
import TokenRoute from "./routes/tokenRoute";

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
    this.app.use("/champion", ChampionRoute);
    this.app.use("/user", UserRoute);
    this.app.use("/token", TokenRoute);
  }
}

export default new App().app;
