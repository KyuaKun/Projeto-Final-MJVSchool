import { Champion } from "../schema/ChampionScheema";
import { ChampionProps } from "../types/Champion/Champion";
import { UpdateChampionProps } from "../types/Champion/UpdateChampion";

class ChampionRepository {
  store(champion: ChampionProps) {
    return Champion.create(champion);
  }

  update(id: string, champion: UpdateChampionProps) {
    return Champion.findByIdAndUpdate({ _id: id }, { $set: champion });
  }

  index() {
    return Champion.find(
      { active: true },
      " -_id -active -createdAt -updatedAt"
    );
  }

  indexAll() {
    return Champion.find();
  }

  show(id: string) {
    return Champion.findById({ _id: id });
  }

  showByName(name: string) {
    return Champion.findOne({ name: name });
  }

  destroy(id: string) {
    return Champion.findOneAndDelete({ _id: id });
  }
}

export default new ChampionRepository();
