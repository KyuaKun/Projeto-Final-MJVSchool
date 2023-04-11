import { NextFunction, Request, Response } from "express";
import { MyError } from "../Error/Champion/ChampionError";
import { environment } from "../config/environment";
import JwtService from "../service/JwtService";
import UserRepository from "../repository/UserRepository";

export const rioterAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers["authorization"];

    if (!authToken) {
      throw new MyError("Necessário fazer login.", 401);
    }

    const bearer = authToken?.split(" ");
    const token = bearer[1];

    if (!token) {
      throw new MyError("Necessário fazer login.", 401);
    }

    const data = JwtService.jwtVerify(token, environment.tokenSecret);

    const payload = typeof data === "string" ? JSON.parse(data) : data;
    const { id, email, username, role } = payload;
    const user = await UserRepository.verifyUserDoc(username, email);
    if (!user || role !== 1) {
      throw new MyError("Usuário inválido.", 401);
    }
    req.userId = id;
    req.userEmail = email;
    req.userName = username;

    next();
  } catch (error) {
    if (error instanceof MyError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
};
