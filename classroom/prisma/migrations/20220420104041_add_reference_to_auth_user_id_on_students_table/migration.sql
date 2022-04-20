/*
  Warnings:

  - A unique constraint covering the columns `[authUserID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "authUserID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_authUserID_key" ON "Student"("authUserID");
