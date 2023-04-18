import { NextFunction, Request, Response } from "express";
import { invalidUserError } from "../Error/invalidUserError";
import { loginRequiredError } from "../Error/loginRequiredError";
import { environment } from "../config/environment";
import UserRepository from "../repository/UserRepository";
import JwtService from "../service/JwtService";

export const tokenAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers["authorization"];

    if (!authToken) {
      throw new loginRequiredError();
    }

    const bearer = authToken?.split(" ");
    const token = bearer[1];

    if (!token) {
      throw new loginRequiredError();
    }

    const data = JwtService.jwtVerify(token, environment.tokenSecret);

    const payload = typeof data === "string" ? JSON.parse(data) : data;
    const { id, email, username, role } = payload;
    const user = await UserRepository.verifyUserDoc(username, email);
    if (!user) {
      throw new invalidUserError();
    }

    req.userId = id;
    req.userEmail = email;
    req.userName = username;
    req.userRole = role;

    // console.log(payload);
    // console.log(req.userId, req.userEmail, req.userName, req.userRole, 'aaaa');

    next();
  } catch (error) {
    if (error instanceof loginRequiredError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    if (error instanceof invalidUserError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
};
