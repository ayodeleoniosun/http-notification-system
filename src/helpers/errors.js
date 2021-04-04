export class CustomError extends Error {
  constructor(type, message = 'Error') {
    super(message)
    this.type = type
    Error.captureStackTrace(this, CustomError)
  }
}
