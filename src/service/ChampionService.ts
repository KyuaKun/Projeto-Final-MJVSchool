import ChampionRepository from "../repository/ChampionRepository";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";
import { ChampionInputError } from "../Error/Champion/ChampionError";

class ChampionService {
  async insertChampion(champion: ChampionProps) {
    const { name, price, role } = champion;

    if (!name || !price || !role) {
      throw new ChampionInputError("Preencha todos os campos corretamente");
    }

    const existDoc = await ChampionRepository.showByName(name);
    if (!existDoc) {
      return ChampionRepository.store(champion);
    }

    throw new ChampionInputError("Já existe um campeão com este nome.");
  }

  async updateChampion(id: string, championDoc: UpdateChampionProps) {
    const listOfChampion = await this.indexChampions();

    const existingName = listOfChampion
      .map((item) => item.name)
      .find((champion) => champion === championDoc.name);

    if (existingName) {
      throw new ChampionInputError("já tem");
    }
    console.log("cheguei aqui");
    const updatedChampion = await ChampionRepository.update(id, championDoc);
    return updatedChampion;
  }

  async indexChampions() {
    const listOfChampions = await ChampionRepository.index();

    if (listOfChampions.length === 0) {
      throw new ChampionInputError("Nenhum campeão encontrado");
    }

    return listOfChampions;
  }

  showOneChampionById(id: string) {
    return ChampionRepository.show(id);
  }

  showOneChampionByName(name: string) {
    return ChampionRepository.showByName(name);
  }

  destroyOneChampionById(id: string) {
    return ChampionRepository.destroy(id);
  }
}

export default new ChampionService();
