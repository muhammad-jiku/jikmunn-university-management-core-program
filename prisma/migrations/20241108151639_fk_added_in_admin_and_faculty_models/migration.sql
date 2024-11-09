/*
  Warnings:

  - A unique constraint covering the columns `[facultyId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_adminId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_facultyId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "users_facultyId_key" ON "users"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "users_adminId_key" ON "users"("adminId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("facultyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;
