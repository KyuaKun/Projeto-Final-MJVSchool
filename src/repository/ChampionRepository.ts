import { Champion } from "../schema/ChampionScheema";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

class ChampionRepository {
  createChampion(champion: ChampionProps) {
    return Champion.create(champion);
  }

  updateChampion(id: string, champion: UpdateChampionProps) {
    return Champion.findByIdAndUpdate({ _id: id }, { $set: champion });
  }

  listAllChampion() {
    return Champion.find();
  }

  findChampionById(id: string) {
    return Champion.findById({ _id: id });
  }

  findChampionByName(name: string) {
    return Champion.findOne({ name: name });
  }

  destroy(id: string) {
    return Champion.findOneAndDelete({ _id: id });
  }
}

export default new ChampionRepository();
