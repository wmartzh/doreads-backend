import { Request, Response } from "express";
import { BaseController } from "../types/base.controller";
import { RegisterStudentSchema, ListStudentSchema } from "../models/student.models";
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
  ////permitir ordenar los resultados de estudiantes de la A-Z, codigo estudiante, id (id´s mas bajos mas antiguos) en orden ascendente y descendente.
    /**
   * It validates the request query against the ListStudentSchema, then calls the studentService.list function, and finally sends the response
   * @param {Request} req
   * @param {Response} res 
   */
  async list(req: Request, res: Response){
    try{
      const { order, orderBy } = await ListStudentSchema.validateAsync(req.query)
      this.responseHandler(res, await studentService.list(order, orderBy), 200)
    }catch(error: any){
      this.errorHandler(res, error);
    }
  }
}

export default new StudentController();