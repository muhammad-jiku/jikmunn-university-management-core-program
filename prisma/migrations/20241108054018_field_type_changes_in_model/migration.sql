/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `academic_departments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `academic_faculties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `buildings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facultyId]` on the table `faculties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "academic_departments_title_key" ON "academic_departments"("title");

-- CreateIndex
CREATE UNIQUE INDEX "academic_faculties_title_key" ON "academic_faculties"("title");

-- CreateIndex
CREATE UNIQUE INDEX "buildings_title_key" ON "buildings"("title");

-- CreateIndex
CREATE UNIQUE INDEX "courses_title_key" ON "courses"("title");

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "faculties_facultyId_key" ON "faculties"("facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "students_studentId_key" ON "students"("studentId");
