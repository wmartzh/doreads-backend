/* The CustomError class extends the Error class and overrides the message property with a custom
message */
export class CustomError extends Error {
  message: any;
  constructor(message: any) {
    super(JSON.stringify(message));
    this.message = message;
  }
}

/* It's a custom error class that extends the built-in Error class, and it has a status property that's
set to the HTTP status code that's passed in */
export class HttpError extends CustomError {
  status: number;
  error: any;
  constructor(error: any, status: number) {
    super(error);
    this.error = error;
    this.status = status;
  }
}
