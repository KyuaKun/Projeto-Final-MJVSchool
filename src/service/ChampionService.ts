import ChampionRepository from "../repository/ChampionRepository";
import { InsertChampionProps } from "../types/Champion/InsertChampion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

class ChampionService {
  insertChampion(champion: InsertChampionProps) {
    const existDoc = ChampionRepository.showByName(champion.name);
    if (!existDoc) {
      return ChampionRepository.store(champion);
    }

    return new Error("Esse nome de campeão já existe.");
  }

  updateChampion(id: string, champion: UpdateChampionProps) {
    return ChampionRepository.update(id, champion);
  }

  indexChampions() {
    return ChampionRepository.index();
  }

  showOneChampion(id: string) {
    return ChampionRepository.show(id);
  }

  destroyOneChampion(id: string) {
    return ChampionRepository.destroy(id);
  }
}

export default new ChampionService();
