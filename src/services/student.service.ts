import { Student, StudentStatus } from "@prisma/client";
import prisma from "../database/client";
import { CustomError } from "../types/custom.error";

class StudentService {
  /** It creates a new student in the database
   * @param {Student} student - The student to be created
   * @returns A promise
   */
  async create(student: Student) {
    const newStudent = await prisma.student.create({
      data: {
        ...student,
      },
    });
    if (!newStudent) {
      throw new CustomError("Error creating student");
    }
    return { message: "Student created successfully" };
  }
  /**
   * It changes the student's status
   * @param {StudentStatus} studentId - The student whose status is to be changed
   * @returns A promise
   */
  async changeStudentStatus(studentId: number, status: StudentStatus) {
    const updateStudent = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        status,
      },
    });
    if (!updateStudent) {
      throw new CustomError("Error updating student");
    }
    return { message: "Student updated successfully" };
  }
  async findStudentByName(name: string) {
    const student = await prisma.student.findMany({
      where: {
        name: name,
      },
    });
    if (!student) {
      throw new CustomError("Student not found");
    }
    return student;
  }
  async findStudentByCode(code: any) {
    const student = await prisma.student.findUnique({
      where: {
        code: code,
      },
    });
    if (!student) {
      throw new CustomError("Student not found");
    }
    return student;
  }
}

export default new StudentService();
