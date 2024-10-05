export class ValidationError extends Error {
  private errors: object;

  constructor(errors: object) {
    super();
    this.errors = errors;
  }

  public getErrors() {
    return this.errors;
  }
}
