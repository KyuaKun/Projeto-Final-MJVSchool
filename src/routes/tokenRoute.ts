import { Request, Response, Router } from "express";
import { invalidCredentialsError } from "../Error/invalidCredentialsError";
import JwtService from "../service/JwtService";
import { UserProps } from "../types/User/User";

const tokenRoute = Router();

tokenRoute.post("/store", async (req: Request, res: Response) => {
  try {
    const { email, password }: UserProps = req.body;
    const data = await JwtService.generateToken(email, password);
    return res.status(200).send({ message: data });
  } catch (error) {
    if (error instanceof invalidCredentialsError) {
      return res.status(error.statusError).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
});

export default tokenRoute;
