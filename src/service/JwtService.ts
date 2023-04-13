import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "../Error/invalidCredentialsError";
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
      throw new invalidCredentialsError();
    }

    const user = await UserRepository.showByEmail(email);
    if (!user) {
      throw new invalidCredentialsError();
    }

    if (!BcryptService.comparePassword(password, user.password)) {
      throw new invalidCredentialsError();
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
