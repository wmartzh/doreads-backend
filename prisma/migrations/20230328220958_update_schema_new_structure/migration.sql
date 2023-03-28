/*
  Warnings:

  - You are about to drop the column `picture` on the `Book` table. All the data in the column will be lost.
  - The `category` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `bookInfoId` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the `BookInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `borrowed` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delayDays` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimateReturn` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returned` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackerId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'DELAYED');

-- DropForeignKey
ALTER TABLE "BookInfo" DROP CONSTRAINT "BookInfo_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_bookInfoId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "picture",
ADD COLUMN     "cover" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[];

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "bookInfoId",
DROP COLUMN "returnDate",
ADD COLUMN     "borrowed" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "delayDays" INTEGER NOT NULL,
ADD COLUMN     "estimateReturn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returned" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'IN_PROGRESS',
ADD COLUMN     "trackerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BookInfo";

-- CreateTable
CREATE TABLE "BookTracker" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE',
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookTracker_code_key" ON "BookTracker"("code");

-- AddForeignKey
ALTER TABLE "BookTracker" ADD CONSTRAINT "BookTracker_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "BookTracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
