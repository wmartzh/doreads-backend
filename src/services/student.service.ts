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
  async filterStudensAtoZ() {
    const students = await prisma.student.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
  async filterStudensZtoA() {
    const students = await prisma.student.findMany({
      orderBy: {
        name: 'desc',
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
  async filterStudensCodeAsc(){
    const students = await prisma.student.findMany({
      orderBy: {
        code: 'asc',
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
  async filterStudensCodeDesc(){
    const students = await prisma.student.findMany({
      orderBy: {
        code: 'desc',
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
  async filterStudensIdAsc(){
    const students = await prisma.student.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }
  async filterStudensIdDesc(){
    const students = await prisma.student.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    if (!students || students.length === 0) {
      throw new CustomError("No students found");
    }
    return students;
  }


}

export default new StudentService();
