export class invalidNameError extends Error {
    constructor(
      message: string = "Este nome não está disponível.",
      public statusError: number = 400
    ) {
      super(message);
      this.name = "invalidNameError";
    }
  }
  