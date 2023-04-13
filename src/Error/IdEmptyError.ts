export class idEmptyError extends Error {
    constructor(
      message: string = "ID não pode permanecer vazio.",
      public statusError: number = 400
    ) {
      super(message);
      this.name = "idEmptyError";
    }
  }
  