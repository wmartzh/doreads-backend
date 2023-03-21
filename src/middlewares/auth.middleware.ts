import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import * as jwt from "jsonwebtoken";
import userService from "../services/user.service";
import { CustomError, HttpError } from "../types/custom.error";
import { getAccessTokenFromHeader } from "../helpers/request.helper";
import { AuthPayload } from "../services/auth.service";
import { DateTime } from "luxon";
import { base64url, jwtDecrypt, jwtVerify } from "jose";

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
  const isRefresh = req.originalUrl.includes("/auth/refresh-token");
  try {
    req.agent = req.get("user-agent");
    if (isRefresh) {
      return next();
    }
    const token = getAccessTokenFromHeader(req);

    if (!token) {
      throw new HttpError({ error: "Invalid token structure" }, 400);
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY || "");
    const result = await jwtVerify(token, secret);

    const payload: any = result.payload;

    if (!req.user) {
      const user = await userService.findUserByEmail(payload.email);
      if (!user) {
        throw new HttpError({ error: "User not found" }, 404);
      }
      req.user = user;
    }
    next();
  } catch (error: any) {
    if (error instanceof HttpError) {
      return res.status(error.status).json(error.error).end();
    }
    return res.status(403).json({ error: "Unauthorized" }).end();
  }
}
