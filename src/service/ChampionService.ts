import { MyError } from "../Error/MyError";
import ChampionRepository from "../repository/ChampionRepository";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

class ChampionService {
  async insertChampion(champion: ChampionProps) {
    const { name, price, role } = champion;

    if (!name || !price || !role) {
      throw new MyError("Preencha todos os campos corretamente", 400);
    }

    const existDoc = await ChampionRepository.showByName(name);
    if (!existDoc) {
      return ChampionRepository.store(champion);
    }

    throw new MyError("Já existe um campeão com este nome.", 400);
  }

  async updateChampion(id: string, championDoc: UpdateChampionProps) {
    if (!id) {
      if (!id) {
        throw new MyError("ID é um campo obrigatório.", 400);
      }
    }
    const listOfChampion = await this.listChampions();

    const existingName = listOfChampion
      .map((item) => item.name)
      .find((champion) => champion === championDoc.name);

    if (existingName) {
      throw new MyError("Já existe um campeão com este nome.", 400);
    }
    console.log("cheguei aqui");
    const updatedChampion = await ChampionRepository.update(id, championDoc);
    return updatedChampion;
  }

  async listChampions() {
    const listOfChampions = await ChampionRepository.index();

    if (listOfChampions.length === 0) {
      throw new MyError("Nenhum campeão no banco de dados.", 200);
    }

    return listOfChampions;
  }

  async showOneChampionById(id: string) {
    if (!id) {
      throw new MyError("ID é um campo obrigatório.", 400);
    }

    const champion = await ChampionRepository.showById(id);

    if (!champion) {
      throw new MyError("ID de campeão não encontrado.", 400);
    }
    return champion;
  }

  async showOneChampionByName(name: string) {
    if (!name) {
      throw new MyError("Nome é um campo obrigatório.", 400);
    }

    const champion = await ChampionRepository.showByName(name);

    if (!champion) {
      throw new MyError("Nome de campeão não encontrado.", 400);
    }
    return champion;
  }

  async destroyOneChampionById(id: string) {
    if (!id) {
      throw new MyError("ID é um campo obrigatório.", 400);
    }

    const champion = await ChampionRepository.destroy(id);

    if (!champion) {
      throw new MyError("ID de campeão não encontrado.", 400);
    }

    return;
  }
}

export default new ChampionService();
