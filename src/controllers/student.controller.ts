import { Request, Response } from "express";
import { BaseController } from "../types/base.controller";
import {
  RegisterStudentSchema,
  ChangeStudentStatusSchema,
} from "../models/student.models";
import studentService from "../services/student.service";

class StudentController extends BaseController {
  /**
   * It validates the request body against the RegisterStudentSchema, then calls the studentService.create function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async create(req: Request | any, res: Response) {
    try {
      const studentData = await RegisterStudentSchema.validateAsync(req.body);
      this.responseHandler(res, await studentService.create(studentData), 200);
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.errorHandler(res, { error: "Student was already registered" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request params against the ChangeStudentStatusSchema, then calls the studentService.changeStudentStatus function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async changeStudentStatus(req: Request | any, res: Response) {
    try {
      const studentData = await ChangeStudentStatusSchema.validateAsync(
        req.params
      );
      this.responseHandler(
        res,
        await studentService.changeStudentStatus(
          studentData.studentId,
          studentData.status
        ),
        200
      );
    } catch (error: any) {
      if (error.code && error.code === "P2025") {
        this.errorHandler(res, { error: "Student doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  async findStudentByName(req: Request, res: Response) {
    try {
      const name = req.params.name;
      const student = await studentService.findStudentByName(name);
      this.responseHandler(res, student, 200);
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(
          res,
          { error: "Student name is not registered" },
          400
        );
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  async findStudentByCode(req: Request | any, res: Response) {
    try {
      const code = Number(req.params.code);
      const student = await studentService.findStudentByCode(code);
      this.responseHandler(res, student, 200);
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "Student code doesn't exist" }, 400);
        this.errorHandler(res, { error: "Student was already registered" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
}

export default new StudentController();
