import { Student, StudentStatus } from "@prisma/client"
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
  /**
   * It changes the student's status
   * @param {StudentStatus} studentId - The student whose status is to be changed
   * @returns A promise
   */
  async changeStudentStatus(studentId: number, status: StudentStatus){
    const updateStudent = await prisma.student.update({
      where: {
        id: studentId
      },
      data: {
        status: status
      }
    })
    if(!updateStudent){throw new CustomError("Error changing student status")}
    return {message: "Student status changed successfully"}
  }
}

export default new StudentService()