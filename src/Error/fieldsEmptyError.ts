export class fieldsEmptyError extends Error {
  constructor(
    message: string = "Preencha todos os campos corretamente.",
    public statusError: number = 400
  ) {
    super(message);
    this.name = "fieldsEmptyError";
  }
}
