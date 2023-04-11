import jwt from "jsonwebtoken";
import { MyError } from "../Error/Champion/ChampionError";
import { environment } from "../config/environment";
import UserRepository from "../repository/UserRepository";
import BcryptService from "./BcryptService";

class JwtService {
  jwtSign(
    id: string,
    username: string,
    email: string,
    role: number,
    secret: string,
    expiresIn: string
  ) {
    const token = jwt.sign({ id, username, email, role }, secret, {
      expiresIn,
    });
    return token;
  }

  jwtVerify(token: string, secret: string) {
    const verificado = jwt.verify(token, secret);
    return verificado;
  }

  async generateToken(email: string, password: string) {
    if (!email || !password) {
      throw new MyError("credenciais inválidas.", 401);
    }

    const user = await UserRepository.showByEmail(email);
    if (!user) {
      throw new MyError("credenciais inválidas.", 401);
    }

    if (!BcryptService.comparePassword(password, user.password)) {
      throw new MyError("credenciais inválidas.", 401);
    }

    const { id, username, role } = user;

    const token = this.jwtSign(
      id,
      username,
      email,
      role,
      environment.tokenSecret,
      environment.tokenExpiration
    );

    return token;
  }
}

export default new JwtService();
