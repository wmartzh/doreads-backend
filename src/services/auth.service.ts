import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HttpError } from "../types/custom.error";
import userService from "./user.service";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { writeFileSync } from "fs";

import blackList from "../../blacklist.json";
const filename = "../../blacklist.json";
export interface VerifyTokenData {
  user: string;
  isAccess?: boolean;
  isRefresh?: boolean;
}
export interface AuthPayload {
  email: string;
  verify: string;
}
class AuthService {
  private generateHash(value: string) {
    const saltRounds = genSaltSync(10);

    return hashSync(value, saltRounds);
  }
  private validatePassword(hash: string, password: string) {
    return compareSync(password, hash);
  }

  private generateVerifyHash(email: string, isAccess?: boolean): string {
    const data: VerifyTokenData = {
      user: email,
    };
    if (isAccess) {
      data.isAccess = true;
    } else {
      data.isRefresh = true;
    }
    return this.generateHash(JSON.stringify(data));
  }

  private generateToken(user: User, isAccess = true) {
    const { EXPIRATION_TOKEN, SECRET_KEY } = process.env;
    const promise: (payload: any, key: string, options: any) => Promise<any> =
      promisify(jwt.sign).bind(jwt);

    const verfyHash = this.generateVerifyHash(user.email, isAccess);
    return promise(
      {
        email: user.email,
        verfy: verfyHash,
      },
      SECRET_KEY || "",
      {
        expiresIn: EXPIRATION_TOKEN || "1d",
      }
    );
  }
  private async generatePairToken(user: User) {
    const accessToken = await this.generateToken(user);
    const refreshToken = await this.generateToken(user, false);
    return { accessToken, refreshToken };
  }
  register(user: User) {
    const { password, ...rest } = user;
    return userService.createUser({
      password: this.generateHash(password),
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
    return this.generatePairToken(user);
  }

  async logOut(token: string) {
    const list: string[] = blackList || [];
    list.push(token);
    writeFileSync(filename, JSON.stringify(blackList));
  }

  async refreshToken(refreshToken: string) {
    const { SECRET_KEY } = process.env;
    const verifyAsync: any = promisify(jwt.verify).bind(jwt);

    const payload: AuthPayload = await verifyAsync(
      refreshToken,
      SECRET_KEY || ""
    );

    const user = await userService.findUserByEmail(payload.email);
    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }

    const verify = JSON.stringify({ user: user.email, isRefresh: true });

    if (!compareSync(verify, payload.verify)) {
      throw new HttpError("Invalid token pair", 401);
    }

    return this.generatePairToken(user);
  }
  async profile(user: User) {
    return { ...user, password: undefined };
  }
}
export default new AuthService();
