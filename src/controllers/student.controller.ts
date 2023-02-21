import { Request, Response } from "express";
import { BaseController } from "../types/base.controller";
import { RegisterStudentSchema, ChangeStudentStatusSchema } from "../models/student.models";
import studentService from "../services/student.service";
import { HttpError } from "../types/custom.error";
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
  async changeStudentStatus(req: Request | any, res: Response){
    try{
      const studentData = await ChangeStudentStatusSchema.validateAsync(req.params)
      this.responseHandler(res, await studentService.changeStudentStatus(studentData.studentId, studentData.status), 200)
    }catch(error: any){
      if (error.code && error.code === "P2025") {
        this.errorHandler(res, { error: "Student doesn't exist" });
      } else {
      this.errorHandler(res, error)
      }
    }
  }
  /**
   * It calls the studentService.getAllStudents function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getAllStudents(req: Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.getAllStudents(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  /**
   * It calls the studentService.getStudentById function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getStudentById(req: Request | any, res: Response){
    try{
      const { id } = req.params
      if (!id) {
        throw new HttpError({ error: "Student id is required" }, 400);
      }
      this.responseHandler(res, await studentService.getStudentById(Number(id)), 200)
    }catch(error: any){
      this.errorHandler(res, { error: "Student doesn't exist" })
    }
  }
  /**
   * It calls the studentService.filterStudensAtoZ function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getStudentsFilterAtoZ(req: Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.filterStudensAtoZ(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  async getStudentsFilterZtoA(req:Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.filterStudensZtoA(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  async getStudentsFilterCodeAsc(req:Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.filterStudensCodeAsc(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  async getStudentsFilterCodeDesc(req:Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.filterStudensCodeDesc(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  async getStudentsFilterIdAsc(req:Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.filterStudensIdAsc(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }
  async getStudentsFilterIdDesc(req:Request | any, res: Response){
    try{
      this.responseHandler(res, await studentService.filterStudensIdDesc(), 200)
    }catch(error: any){
      this.errorHandler(res, error)
    }
  }


}

export default new StudentController();