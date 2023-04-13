export class invalidUserError extends Error {
    constructor(
      message: string = "Usuário sem autorização.",
      public statusError: number = 401
    ) {
      super(message);
      this.name = "invalidUserError";
    }
  }
  