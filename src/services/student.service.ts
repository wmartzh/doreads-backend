import { Student } from "@prisma/client"
import prisma from "../database/client"
import { CustomError } from "../types/custom.error"
import { OrderBy } from "../models/order-by"

class StudentService{
  /** It creates a new student in the database
   * @param {Student} student - The student to be created
   * @returns A promise
   */
  async create(student: Student){
    const newStudent = await prisma.student.create({
      data: {
        ...student,
      }
    })
    if(!newStudent){throw new CustomError("Error creating student")}
    return {message: "Student created successfully"}
  }
  ////permitir ordenar los resultados de estudiantes de la A-Z, codigo estudiante, id (id´s mas bajos mas antiguos) en orden ascendente y descendente.
    /**
   * It returns the list of students ordered by the specified field and order
   * @param {string} order
   * @param {string} orderBy
   * @returns {Promise<Student[]>}
   */
  async list(order: string, orderBy: string): Promise<Student[]> {
    let orderByObj: OrderBy = {};
    orderByObj[orderBy] = order === "asc" ? 1 : -1;

    return Student.find().sort(orderByObj);
  }
  
}

export default new StudentService()