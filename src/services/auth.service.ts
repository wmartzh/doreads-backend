import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HttpError } from "../types/custom.error";
import userService from "./user.service";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
class AuthService {
  private hashPassword(password: string) {
    const saltRounds = genSaltSync(10);

    return hashSync(password, saltRounds);
  }
  private validatePassword(hash: string, password: string) {
    return compareSync(password, hash);
  }
  private generateAccessToken(user: User) {
    const { EXPIRATION_TOKEN, SECRET_KEY } = process.env;
    const promise: (payload: any, key: string, options: any) => Promise<any> =
      promisify(jwt.sign).bind(jwt);
    return promise(
      {
        email: user.email,
      },
      SECRET_KEY || "",
      {
        expiresIn: EXPIRATION_TOKEN || "1d",
      }
    );
  }
  register(user: User) {
    const { password, ...rest } = user;
    return userService.createUser({
      password: this.hashPassword(password),
      ...rest,
    });
  }

  async login(email: string, password: string) {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }
    if (!this.validatePassword(user.password, password)) {
      throw new HttpError("Password doesn't match", 401);
    }
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
  async refreshToken(refreshToken: string) {
    const { SECRET_KEY } = process.env;
    const promise: (token: string, key: string) => Promise<any> =
      promisify(jwt.verify).bind(jwt);
    const payload = await promise(refreshToken, SECRET_KEY || "");
    const user = await userService.findUserByEmail(payload.email);
    console.log(user);
    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
  async profile(Token: string) {
    const { SECRET_KEY } = process.env;
    const promise: (token: string, key: string) => Promise<any> =
      promisify(jwt.verify).bind(jwt);
    const payload = await promise(Token, SECRET_KEY || "");
    const user = await userService.findUserByEmail(payload.email);

    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }
    const { password, ...rest } = user;
    return rest;

  }
  
}
export default new AuthService();

