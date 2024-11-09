/*
  Warnings:

  - You are about to drop the column `name` on the `management_departments` table. All the data in the column will be lost.
  - The `paymentMethod` column on the `student_semester_payament_histories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `faculties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNo]` on the table `faculties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNo]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `gender` on the `admins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bloodGroup` on the `admins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `faculties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bloodGroup` on the `faculties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `title` to the `management_departments` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bloodGroup` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'FACULTY', 'ADMIN');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'ONLINE');

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "BloodGroup" NOT NULL;

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "BloodGroup" NOT NULL;

-- AlterTable
ALTER TABLE "management_departments" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_semester_payament_histories" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'ONLINE';

-- AlterTable
ALTER TABLE "students" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "BloodGroup" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropEnum
DROP TYPE "PayementMethod";

-- CreateIndex
CREATE UNIQUE INDEX "faculties_email_key" ON "faculties"("email");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_contactNo_key" ON "faculties"("contactNo");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_contactNo_key" ON "students"("contactNo");
