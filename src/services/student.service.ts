import { Role, Student, StudentStatus } from "@prisma/client";
import { SortOptions } from "../types/req.filter";
import prisma from "../database/client";
import { HttpError } from "../types/custom.error";
import { paginateResult } from "../helpers/pagination.helper";
import { getSearchQuery } from "../helpers/queries.helper";

class StudentService {
  /**
   * It adds a new student
   * @param {Student} student - The student data
   * @returns A promise
   */
  async addStudent(student: Student) {
    return await prisma.student.create({ data: student });
  }
  /**
   * It changes the student status
   * @param {number} studentId - The student id
   * @param {string} status - The student status
   * @returns A promise
   */
  async changeStudentStatus(studentId: number, status: StudentStatus) {
    return await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        status,
      },
    });
  }
  /**
   * It updates an existing student information
   * @param {Student} student - The student to update
   * @param {number} studentId - The student id
   * @returns A promise
   */
  async updateStudent(student: Student, studentId: number) {  
    return await prisma.student.update({
      where: {
        id: studentId,
      },
      data: student,
    });
  }
  /**
   * It deletes a student, only if the user is an admin
   * @param {number} studentId - The student id
   * @param {Role} role - The user role
   * @returns A promise
   */
  async deleteStudent(studentId: number, role: Role) {
    if (role === "ADMIN") {
      return await prisma.student.delete({
        where: {
          id: studentId,
        },
      });
    } else {
      throw new HttpError("You don't have permission to delete a student", 403);
    }
  }
  /**
   * It gets all students with pagination and filter middlewares
   * @param {number} limit - The limit of results
   * @param {number} offset - The offset of results
   * @param {SortOptions} sortOption - The sort option
   * @param {string} search - The search query
   * @param {any} req - The request object
   * @returns A promise
   */
  async getAllStudents(limit: number, offset: number, sortOption: SortOptions, search?: string) {
    const count = await prisma.student.count();
    if (count === 0) { throw new HttpError("There are no students", 404);}
    const query: any = {
      take: limit,
      skip: offset,
      orderBy: {
        [sortOption.order]: sortOption.sort,
      },
    };
    if (search) {
      query["where"] = getSearchQuery(["name", "code"], search);
    }
    const result = await prisma.student.findMany(query);
    const paginatedResult = paginateResult(result, limit, offset, count);
    return paginatedResult;
  }
  /**
   * It gets a student by id
   * @param {number} studentId - The student id
   * @returns A promise
   */
  async getStudentById(studentId: number) {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    if (!student) { throw new HttpError("Student not found", 404);}
    return student;
  }
}

export default new StudentService();