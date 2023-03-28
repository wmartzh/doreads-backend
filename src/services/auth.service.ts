import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HttpError } from "../types/custom.error";
import userService from "./user.service";
import { writeFileSync } from "fs";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import blackList from "../../blacklist.json";

const filename = "../../blacklist.json";
export interface VerifyTokenData {
  user: string;
  isAccess?: boolean;
  isRefresh?: boolean;
}

export interface AuthPayload extends JWTPayload {
  email: string;
  verify: string;
  lastSigned: Date;
  agent: string;
}
class AuthService {
  private secret = new TextEncoder().encode(process.env.SECRET_KEY || "");
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

  private generateToken(user: User, agent?: string, isAccess = true) {
    const { EXPIRATION_TOKEN } = process.env;
    const expiration = isAccess ? EXPIRATION_TOKEN || "1d" : "60d";
    const verfyHash = this.generateVerifyHash(user.email, isAccess);
    const payload = {
      email: user.email,
      verify: verfyHash,
      lastSigned: new Date(),
      agent,
    };
    return new SignJWT(payload)
      .setIssuer(user.email)
      .setExpirationTime(expiration)
      .setIssuedAt()
      .setProtectedHeader({ alg: "HS256" })
      .sign(this.secret);
  }
  private async generatePairToken(user: User, agent?: string) {
    const accessToken = await this.generateToken(user, agent);
    const refreshToken = await this.generateToken(user, agent, false);
    return { accessToken, refreshToken };
  }
  register(user: User) {
    const { password, ...rest } = user;
    return userService.createUser({
      password: this.generateHash(password),
      ...rest,
    });
  }

  async login(email: string, password: string, agent?: string) {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }
    if (!this.validatePassword(user.password, password)) {
      throw new HttpError("Password doesn't match", 400);
    }
    return this.generatePairToken(user, agent);
  }

  async logOut(token: string) {
    const list: string[] = blackList || [];
    list.push(token);
    writeFileSync(filename, JSON.stringify(blackList));
  }

  async refreshToken(refreshToken: string, agent?: string) {
    try {
      const result = await jwtVerify(refreshToken, this.secret);

      const payload: any = result.payload;

      const user = await userService.findUserByEmail(payload.email);
      if (!user) {
        throw new HttpError("User doesn't exist", 404);
      }

      const verify = JSON.stringify({ user: user.email, isRefresh: true });

      if (!compareSync(verify, payload.verify)) {
        throw new HttpError("Invalid token pair", 401);
      }

      return this.generatePairToken(user, agent);
    } catch (error: any) {
      if (error.code === "ERR_JWT_EXPIRED") {
        throw new HttpError({ message: "Token expired " }, 401);
      }
      throw error;
    }
  }
  async profile(user: User) {
    return { ...user, password: undefined };
  }
}
export default new AuthService();
