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
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { name: { startsWith: name } },
          { name: { contains: name } },
          { name: { equals: name } },
        ],
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
  async findStudentByCode(code: any) {
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { code: { equals: code } },
        ],
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
}

export default new StudentService();
