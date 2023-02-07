import { User } from "@prisma/client";
import prisma from "../database/client";
class UserService {
  createUser(user: User) {
    return prisma.user.create({ data: user });
  }
  findUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }
}

export default new UserService();
