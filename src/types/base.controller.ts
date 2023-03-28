import { Response } from "express";
import { HttpError } from "./custom.error";
import { ValidationError } from "joi";

export class BaseController {
  /**
   * A function that takes in a response, a response object, and a status code. It then sets the status
   * of the response to the status code and returns the response object.
   * @param {Response} res - The response object
   * @param {any} response - The response object that will be sent to the client.
   * @param {number} statusCode - The HTTP status code to return.
   */
  public responseHandler(res: Response, response: any, statusCode: number) {
    return res.status(statusCode).json(response).end();
  }

  /**
   * If the error is an instance of HttpError, then return the responseHandler function with the error
   * message and status. Otherwise, return the responseHandler function with the error and a status of
   * 500
   * @param {Response} res - Response - The response object that will be sent back to the client
   * @param {any} error - The error object that was thrown
   * @returns The responseHandler function is being returned.
   */
  public errorHandler(res: Response, error: any) {
    if (error instanceof HttpError) {
      this.responseHandler(res, { error: error.message }, error.status);
    } else if (error instanceof ValidationError) {
      this.responseHandler(res, { error: error.details[0].message }, 400);
    } else {
      this.responseHandler(res, { error: error }, 500);
    }
  }
}
