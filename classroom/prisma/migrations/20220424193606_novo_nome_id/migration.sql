/*
  Warnings:

  - You are about to drop the column `authUserID` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_authUserID_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "authUserID",
ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_authUserId_key" ON "Student"("authUserId");
