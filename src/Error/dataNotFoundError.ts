export class dataNotFoundError extends Error {
  constructor(
    message: string = "Nenhum dado correspondente encontrado.",
    public statusError: number = 200
  ) {
    super(message);
    this.name = "dataNotFoundError";
  }
}
