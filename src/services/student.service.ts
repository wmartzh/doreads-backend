import { Student } from "@prisma/client"
import prisma from "../database/client"
import { CustomError } from "../types/custom.error"

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
}

export default new StudentService()