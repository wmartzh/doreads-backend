import { Student, StudentStatus } from "@prisma/client";
import prisma from "../database/client";
import { CustomError } from "../types/custom.error";

class StudentService {
  /** It creates a new student in the database
   * @param {Student} student - The student data
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
   * @param {number} studentId - The student id
   * @param {StudentStatus} status - The student status
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
  /**
   * It gets all the students
   * @returns A promise
   */
  async getAllStudents() {
    const allStudents = await prisma.student.findMany();
    if (!allStudents) {
      throw new CustomError("Error getting students");
    }
    return allStudents;
  }
  /**
   * It gets a student by id
   * @param {number} studentId - The student id
   * @returns A promise
   */
  async getStudentById(studentId: number) {
    const studentById = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    if (!studentById) {
      throw new CustomError("Error getting student");
    }
    return studentById;
  }
  /**
   * It gets a student by name
   * @param {String} name - The student name
   * @returns A promise
   */
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
  /**
   * It gets a student by code
   * @param {number} code - The student code
   * @returns A promise
   */
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
