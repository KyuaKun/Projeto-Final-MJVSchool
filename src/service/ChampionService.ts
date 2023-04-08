import { ChampionInputError } from "../Error/Champion/ChampionError";
import ChampionRepository from "../repository/ChampionRepository";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

class ChampionService {
  async insertChampion(champion: ChampionProps) {
    const { name, price, role } = champion;

    if (!name || !price || !role) {
      throw new ChampionInputError(
        "Preencha todos os campos corretamente",
        400
      );
    }

    const existDoc = await ChampionRepository.showByName(name);
    if (!existDoc) {
      return ChampionRepository.store(champion);
    }

    throw new ChampionInputError("Já existe um campeão com este nome.", 400);
  }

  async updateChampion(id: string, championDoc: UpdateChampionProps) {
    const listOfChampion = await this.listChampions();

    const existingName = listOfChampion
      .map((item) => item.name)
      .find((champion) => champion === championDoc.name);

    if (existingName) {
      throw new ChampionInputError("Já existe um campeão com este nome.", 400);
    }
    console.log("cheguei aqui");
    const updatedChampion = await ChampionRepository.update(id, championDoc);
    return updatedChampion;
  }

  async listChampions() {
    const listOfChampions = await ChampionRepository.index();

    if (listOfChampions.length === 0) {
      throw new ChampionInputError("Nenhum campeão encontrado", 400);
    }

    return listOfChampions;
  }

  async listChampionsDoc() {
    const listOfChampions = await ChampionRepository.indexAll();

    if (listOfChampions.length === 0) {
      throw new ChampionInputError("Nenhum campeão encontrado", 400);
    }

    return listOfChampions;
  }

  async showOneChampionById(id: string) {
    if (!id) {
      throw new ChampionInputError("ID é um campo obrigatório", 400);
    }

    const champion = await ChampionRepository.show(id);

    if (!champion) {
      throw new ChampionInputError("ID de campeão não encontrado", 400);
    }
    return champion;
  }

  async showOneChampionByName(name: string) {
    if (!name) {
      throw new ChampionInputError("Nome é um campo obrigatório", 400);
    }

    const champion = await ChampionRepository.showByName(name);

    if (!champion) {
      throw new ChampionInputError("Nome de campeão não encontrado", 400);
    }
    return champion;
  }

  async destroyOneChampionById(id: string) {
    if (!id) {
      throw new ChampionInputError("ID é um campo obrigatório", 400);
    }

    const champion = await ChampionRepository.destroy(id);

    if (!champion) {
      throw new ChampionInputError("ID de campeão não encontrado", 400);
    }

    return;
  }
}

export default new ChampionService();
