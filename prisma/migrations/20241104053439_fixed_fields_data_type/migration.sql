/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactNo` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `admins` table. All the data in the column will be lost.
  - Changed the type of `gender` on the `admins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `bloodGroup` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "dateOfBirth",
DROP COLUMN "emergencyContactNo",
DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" TEXT NOT NULL;

-- DropEnum
DROP TYPE "BloodGroup";

-- DropEnum
DROP TYPE "Gender";
