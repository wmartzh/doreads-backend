import { Request, Response } from "express";
import { BaseController } from "../types/base.controller";
import { RegisterStudentSchema } from "../models/student.models";
import studentService from "../services/student.service";

class StudentController extends BaseController{
  /**
   * It validates the request body against the RegisterStudentSchema, then calls the studentService.create function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res 
   */
  async create(req: Request | any, res: Response){
    try{
      const studentData = await RegisterStudentSchema.validateAsync(req.body)
      this.responseHandler(res, await studentService.create(studentData), 200)
    }catch(error){
      this.errorHandler(res, error);
    }
  }
}

export default new StudentController();