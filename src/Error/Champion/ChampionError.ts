export class ChampionInputError extends Error {
  constructor(message: string, public statusError: number) {
    super(message);
    this.name = "ChampionInputError";
  }
}
