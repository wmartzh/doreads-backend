import request from "supertest";
import { app } from "../../server";

describe("Auth service", () => {
  describe("GET /auth/profile", () => {
    it("should return user profile without password when user is authenticated", async () => {
      // First, we need to log in to get the token
      const loginResponse = await request(app)
        .post("/auth/login")
        .send({
          email: "cernajose79@gmail.com",
          password: "qwerty123",
        })
        .expect(200);

      const token = loginResponse.body.accessToken;

      // Now we can make the request to /auth/profile with the token
      const response = await request(app)
        .get("/auth/profile")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      // Assert that the response body is correct
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: "cernajose79@gmail.com",
        name: "Jose",
        role: "LIBRARIAN",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      // Assert that the response body doesn't contain the password
      expect(response.body.password).toBeUndefined();
    });

    it("should return 401 if user is not authenticated", async () => {
      await request(app).get("/auth/profile").expect(401);
    });
  });
});
