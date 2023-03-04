import { Request, Response } from "express";
import { BaseController } from "../types/base.controller";
import { RegisterStudentSchema, ChangeStudentStatusSchema, UpdateStudentSchema } from "../models/student.models";
import studentService from "../services/student.service";
import { SortOptions } from "../types/req.filter";

class StudentController extends BaseController {
  /**
   * It validates the request body with the RegisterStudentSchema, then calls the studentService.addStudent function, and finally sends the response
   * @param {Request | any} req
  *  @param {Response} res
   */
  async createStudent(req: Request | any, res: Response) {
    try {
      const data = await RegisterStudentSchema.validateAsync(req.body);
      const result = await studentService.addStudent(data);
      this.responseHandler(res, { message: `Student ${result.code} registered successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2002') {
        this.errorHandler(res, { error: 'Student was already registered' });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request params with the ChangeStudentStatusSchema, then calls the studentService.changeStudentStatus function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async changeStudentStatus(req: Request | any, res: Response) {
    try {
      const data = await ChangeStudentStatusSchema.validateAsync(req.params);
      const result = await studentService.changeStudentStatus(data.studentId, data.status);
      this.responseHandler(res, { message: `Student ${result.name} status changed successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2025') {
        this.errorHandler(res, { error: "Student doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request body with the UpdateStudentSchema, then calls the studentService.updateStudent function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async updateStudent(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const data = await UpdateStudentSchema.validateAsync(req.body);
      const result = await studentService.updateStudent(data, Number(id));
      this.responseHandler(res, { message: `Student ${result.name} updated successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2025') {
        this.errorHandler(res, { error: "Student doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It calls the studentService.deleteStudent function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async deleteStudent(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const result = await studentService.deleteStudent(Number(id), req.user.role);
      this.responseHandler(res, { message: `Student ${result.name} deleted successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2025') {
        this.errorHandler(res, { error: "Student doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It calls the studentService.getAllStudents function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getAllStudents(req: Request | any, res: Response) {
    try {
      const { limit, offset } = req.pagination;
      const { search } = req.query;
      const filter: SortOptions = req.filter;

      const result = await studentService.getAllStudents(limit, offset, filter, search, req);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }   
  }
  /**
   * It calls the studentService.getStudentById function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getStudentById(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const result = await studentService.getStudentById(Number(id));
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
}

export default new StudentController();
