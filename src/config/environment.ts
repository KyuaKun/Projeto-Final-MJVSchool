import * as dotenv from "dotenv";
dotenv.config();

export const environment = {
  databaseURL: String(process.env.DB_URL),
  serverPort: Number(process.env.SERVER_PORT),
  saltRounds: Number(process.env.SALT),
  tokenSecret: String(process.env.TOKEN_SECRET),
  tokenExpiration: String(process.env.TOKEN_EXPIRATION),
};
