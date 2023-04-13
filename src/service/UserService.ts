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

    const existUser = await UserRepository.showByName(username);
    if (!existUser) {
      return UserRepository.store({ ...user, password: hashPassword });
    }

    throw new invalidNameError();
  }

  async listUsers() {
    const listUsers = await UserRepository.index();
    if (listUsers.length === 0) {
      throw new dataNotFoundError();
    }
    return listUsers;
  }

  async readOneUser(id: string) {
    if (!id) {
      throw new idEmptyError();
    }

    const user = await UserRepository.showById(id);
    if (!user) {
      throw new dataNotFoundError();
    }
    return user;
  }

  async searchPlayer(username: string) {
    if (!username) {
      return;
    }
    const player = await UserRepository.showByName(username);
    if (!player) {
      throw new dataNotFoundError();
    }

    return player;
  }

  async updateYourself(id: string, user: UpdateUserProps) {
    if (!id) {
      if (!id) {
        throw new idEmptyError();
      }
    }
    const userDoc = await UserRepository.showById(id);
    if (!userDoc) {
      throw new dataNotFoundError();
    }
    const existUsername = await UserRepository.showByName(userDoc.username);
    if (!existUsername) {
      const updateUser = await UserRepository.update(id, { ...user });
      return updateUser;
    }
    throw new invalidNameError();
  }

  async destroy(id: string) {
    if (!id) {
      throw new idEmptyError();
    }
    const user = await UserRepository.destroy(id);
    if (!user) {
      throw new dataNotFoundError();
    }
    return;
  }
}

export default new UserService();
