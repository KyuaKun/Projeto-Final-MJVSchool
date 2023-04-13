export class loginRequiredError extends Error {
  constructor(
    message: string = "Necessário fazer login necessário.",
    public statusError: number = 401
  ) {
    super(message);
    this.name = "loginRequiredError";
  }
}
