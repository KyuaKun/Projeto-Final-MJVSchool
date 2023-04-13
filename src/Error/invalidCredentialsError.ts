export class invalidCredentialsError extends Error {
  constructor(
    message: string = "Credenciais inválidas.",
    public statusError: number = 401
  ) {
    super(message);
    this.name = "invalidCredentialsError";
  }
}
