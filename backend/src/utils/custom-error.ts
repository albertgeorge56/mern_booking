export class CustomError extends Error {
  public constructor(
    public message: string,
    public status: number = 500
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }
}
