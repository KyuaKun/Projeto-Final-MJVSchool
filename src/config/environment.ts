import * as dotenv from "dotenv";
dotenv.config();

export const environment = {
  databaseURL: process.env.DB_URL as string,
  serverPort: Number(process.env.SERVER_PORT),
};
