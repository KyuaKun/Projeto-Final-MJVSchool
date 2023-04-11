import { environment } from "./../config/environment";
import bcrypt from "bcrypt";

class BcryptService {
  hashPassword(password: string) {
    const hash = bcrypt.hashSync(password, environment.saltRounds);
    return hash;
  }

  comparePassword(password: string, hash: string) {
    const compare = bcrypt.compareSync(password, hash);
    return compare;
  }
}

export default new BcryptService();
