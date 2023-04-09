export class MyError extends Error {
  constructor(message: string, public statusError: number) {
    super(message);
    this.name = "MyError";
  }
}
