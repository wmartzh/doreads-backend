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
    }catch(error: any){
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "Student was already registered" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request body against the ChangeStudentStatusSchema, then calls the studentService.changeStudentStatus function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async blockStudent(req: Request | any, res: Response){
    try{
      const result = await studentService.changeStudentStatus(req.body.studentId, "BLOCKED")
      this.responseHandler(res, result, 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  async unblockStudent(req: Request | any, res: Response){
    try{
      const result = await studentService.changeStudentStatus(req.body.studentId, "ACTIVE")
      this.responseHandler(res, result, 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
}

export default new StudentController();