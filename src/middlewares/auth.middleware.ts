import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import * as jwt from "jsonwebtoken";
import userService from "../services/user.service";
import { CustomError } from "../types/custom.error";

/**
 * It takes a request object, and returns the access token from the authorization header, or null if
 * there is no authorization header
 * @param {Request} req - Request - The request object that was sent to the server.
 * @returns The access token from the header.
 */
function getAccessTokenFromHeader(req: Request): string | null {
  const authorization = req.headers["authorization"]?.split(" ");
  return authorization ? authorization[1] : null;
}

/**
 * It takes a request, checks if there's a token in the header, if there is, it verifies the token, and
 * if it's valid, it adds the user to the request object
 * @param {Request | any} req - Request | any: The request object.
 * @param {Response} res - Response - this is the response object that will be sent back to the client.
 * @param {NextFunction} next - This is a function that you call when you want to pass control to the
 * next middleware function in the stack.
 */
export async function authMiddleware(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const { SECRET_KEY } = process.env;

    const token = getAccessTokenFromHeader(req);
    const verifyAsync: any = promisify(jwt.verify).bind(jwt);
    const payload = await verifyAsync(token, SECRET_KEY);

    if (!req.user) {
      const user = await userService.findUserByEmail(payload.email);
      if (!user) {
        throw new CustomError({ error: "User not found" });
      }
      req.user = user;
    }
    next();
  } catch (error: any) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
