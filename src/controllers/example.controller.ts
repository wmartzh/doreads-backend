import { Request, Response } from "express";
import exampleService from "../services/example.service";
import { BaseController } from "../types/base.controller";
class ExampleController extends BaseController {
  helloWorld(_req: Request, res: Response) {
    this.responseHandler(res, exampleService.getMessage(), 200);
  }
}

export default new ExampleController();
