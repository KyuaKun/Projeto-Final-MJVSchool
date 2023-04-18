import { invalidNameError } from "../Error/invalidNameError";
import UserRepository from "../repository/UserRepository";
import { InsertUserProps } from "../types/User/InsertUser";
import { UpdateUserProps } from "../types/User/UpdateUser";
import { idEmptyError } from "./../Error/IdEmptyError";
import { dataNotFoundError } from "./../Error/dataNotFoundError";
import { fieldsEmptyError } from "./../Error/fieldsEmptyError";
import BcryptService from "./BcryptService";

class UserService {
  async insertUser(user: InsertUserProps) {
    const { email, username, password } = user;

    if (!email || !username || !password) {
      throw new fieldsEmptyError();
    }

    const hashPassword = BcryptService.hashPassword(password);
    const existEmail = await UserRepository.findUserByEmail(email);
    const existUsername = await UserRepository.findUserByUsername(username);

    if (!existUsername && !existEmail) {
      return UserRepository.createUser({ ...user, password: hashPassword });
    }

    throw new invalidNameError();
  }

  async listUsers() {
    const listUsers = await UserRepository.listAllUsers();
    if (listUsers.length === 0) {
      throw new dataNotFoundError();
    }
    return listUsers;
  }

  async readUserById(id: string) {
    if (!id) {
      throw new idEmptyError();
    }

    const user = await UserRepository.findUserById(id);

    if (!user) {
      throw new dataNotFoundError();
    }
    return user;
  }

  async searchPlayer(username: string) {
    if (!username) {
      return;
    }
    const player = await UserRepository.findUserByUsername(username);
    if (!player) {
      throw new dataNotFoundError();
    }

    return player;
  }

  async update(id: string, user: UpdateUserProps) {
    if (!id) {
      if (!id) {
        throw new idEmptyError();
      }
    }
    const userDoc = await UserRepository.findUserById(id);
    if (!userDoc) {
      throw new dataNotFoundError();
    }
    const existUsername = await UserRepository.findUserByUsername(
     user.username as string
    );
    if (!existUsername) {
      const updateUser = await UserRepository.findByIdAndUpdate(id, {
        ...user,
      });
      return updateUser;
    }
    throw new invalidNameError();
  }

  

  async destroy(id: string) {
    if (!id) {
      throw new idEmptyError();
    }
    const user = await UserRepository.deleteUserById(id);
    if (!user) {
      throw new dataNotFoundError();
    }
    return;
  }
}

export default new UserService();
