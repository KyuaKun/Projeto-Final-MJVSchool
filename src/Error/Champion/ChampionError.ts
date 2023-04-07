export class ChampionInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChampionInputError";
  }
}
