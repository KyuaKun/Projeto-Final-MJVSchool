import UserRepository from "../repository/UserRepository";
import BcryptService from "./BcryptService";
import { MyError } from "../Error/Champion/ChampionError";
import { InsertUserProps } from "../types/User/InsertUser";
import { UpdateUserProps } from "../types/User/UpdateUser";

class UserService {
  async insertUser(user: InsertUserProps) {
    const { email, username, password } = user;

    if (!email || !username || !password) {
      throw new MyError("Preencha todos os campos corretamente", 400);
    }

    const hashPassword = BcryptService.hashPassword(password);

    const existUser = await UserRepository.showByName(username);
    if (!existUser) {
      return UserRepository.store({ ...user, password: hashPassword });
    }

    throw new MyError("Já existe um usuário com este nome.", 400);
  }

  async listUsers() {
    const listUsers = await UserRepository.index();
    if (listUsers.length === 0) {
      console.log("entrei");
      throw new MyError("Nenhum usuário no banco de dados.", 200);
    }
    return listUsers;
  }

  async readOneUser(id: string) {
    if (!id) {
      throw new MyError("ID é um campo obrigatório.", 400);
    }

    const user = await UserRepository.showById(id);
    if (!user) {
      throw new MyError("Usuário não encontrado ou não existe.", 400);
    }
    return user;
  }

  async searchPlayer(username: string) {
    if (!username) {
      return;
    }
    const player = await UserRepository.showByName(username);
    if (!player) {
      throw new MyError("Usuário não encontrado.", 400);
    }

    return player;
  }

  async updateYourself(id: string, user: UpdateUserProps) {
    if (!id) {
      if (!id) {
        throw new MyError("ID é um campo obrigatório.", 400);
      }
    }
    const userDoc = await UserRepository.showById(id);
    if (!userDoc) {
      throw new MyError("Não encontrado", 401);
    }
    const existUsername = await UserRepository.showByName(userDoc.username);
    if (!existUsername) {
      const updateUser = await UserRepository.update(id, { ...user });
      return updateUser;
    }
    throw new MyError("Username não disponível", 400);
  }

  async destroy(id: string) {
    if (!id) {
      throw new MyError("ID é um campo obrigatório.", 400);
    }
    const user = await UserRepository.destroy(id);
    if (!user) {
      throw new MyError("ID de usuário não encontrado.", 400);
    }
    return;
  }
}

export default new UserService();
