/**
 * This is just an example is not a functional test
 */

import request from "supertest";
import { app } from "../../server";
import studentController from "../student.controller";

describe("Student service", () => {
  it("Should get list of students", async () => {
    jest
      .spyOn(studentController, "getAllStudents")
      .mockResolvedValue(Promise.resolve());
    const response = await request(app).get("/student");

    expect(response).toBeDefined();
  });
});
