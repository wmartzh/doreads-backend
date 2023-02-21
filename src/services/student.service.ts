import { Student } from "@prisma/client"
import prisma from "../database/client"
import { CustomError } from "../types/custom.error"


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

export default new StudentService();
