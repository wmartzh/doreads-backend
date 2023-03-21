import { Request } from "express";

/**
 * It takes a request object, and returns the access token from the authorization header, or null if
 * there is no authorization header
 * @param {Request} req - Request - The request object that was sent to the server.
 * @returns The access token from the header.
 */
export function getAccessTokenFromHeader(req: Request): string | null {
  const authorization = req.headers["authorization"]?.split(" ");
  return authorization ? authorization[1] : null;
}
