/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Penalty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookInfo" DROP CONSTRAINT "BookInfo_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_bookInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Penalty" DROP CONSTRAINT "Penalty_studentId_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "BookInfo";

-- DropTable
DROP TABLE "Loan";

-- DropTable
DROP TABLE "Penalty";

-- DropTable
DROP TABLE "Student";

-- DropEnum
DROP TYPE "BookStatus";

-- DropEnum
DROP TYPE "PenaltyStatus";

-- DropEnum
DROP TYPE "StudentStatus";
