import { idEmptyError } from "../Error/IdEmptyError";
import { dataNotFoundError } from "../Error/dataNotFoundError";
import { fieldsEmptyError } from "../Error/fieldsEmptyError";
import { invalidNameError } from "../Error/invalidNameError";
import ChampionRepository from "../repository/ChampionRepository";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

class ChampionService {
  async insertChampion(champion: ChampionProps) {
    const { name, price, role } = champion;

    if (!name || !price || !role) {
      throw new fieldsEmptyError();
    }

    const existDoc = await ChampionRepository.showByName(name);
    if (!existDoc) {
      return ChampionRepository.store(champion);
    }

    throw new invalidNameError();
  }

  async updateChampion(id: string, championDoc: UpdateChampionProps) {
    if (!id) {
      if (!id) {
        throw new idEmptyError();
      }
    }
    const listOfChampion = await this.listChampions();

    const existingName = listOfChampion
      .map((item) => item.name)
      .find((champion) => champion === championDoc.name);

    if (existingName) {
      throw new invalidNameError();
    }
    const updatedChampion = await ChampionRepository.update(id, championDoc);
    return updatedChampion;
  }

  async listChampions() {
    const listOfChampions = await ChampionRepository.index();

    if (listOfChampions.length === 0) {
      throw new dataNotFoundError();
    }

    return listOfChampions;
  }

  async showOneChampionById(id: string) {
    if (!id) {
      throw new idEmptyError();
    }

    const champion = await ChampionRepository.showById(id);

    if (!champion) {
      throw new dataNotFoundError();
    }
    return champion;
  }

  async showOneChampionByName(name: string) {
    if (!name) {
      throw new fieldsEmptyError();
    }

    const champion = await ChampionRepository.showByName(name);

    if (!champion) {
      throw new dataNotFoundError();
    }
    return champion;
  }

  async destroyOneChampionById(id: string) {
    if (!id) {
      throw new idEmptyError();
    }

    const champion = await ChampionRepository.destroy(id);

    if (!champion) {
      throw new dataNotFoundError();
    }

    return;
  }
}

export default new ChampionService();
