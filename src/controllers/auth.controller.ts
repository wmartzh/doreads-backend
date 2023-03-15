import { Request, Response } from "express";
import {
  LoginSchema,
  RegisterUserSchema,
  RefreshTokenSchema,
} from "../models/auth.models";
import authService from "../services/auth.service";
import { BaseController } from "../types/base.controller";
interface RequestProfile extends Request {
  user?: any;
}

class AuthController extends BaseController {
  async register(req: Request, res: Response) {
    try {
      const data = await RegisterUserSchema.validateAsync(req.body);
      const result = await authService.register(data);
      this.responseHandler(
        res,
        { message: `User ${result.name} created successfully` },
        200
      );
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "User was already register" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = await LoginSchema.validateAsync(req.body);
      const result = await authService.login(data.email, data.password);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }

  async resfreshToken(req: Request, res: Response) {
    try {
      const data = await RefreshTokenSchema.validateAsync(req.body);
      const result = await authService.refreshToken(data.refreshToken);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
  async profile(req: RequestProfile, res: Response) {
    try {
      const result = await authService.profile(req.user);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
    
}

export default new AuthController();
