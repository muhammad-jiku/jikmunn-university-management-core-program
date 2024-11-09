import { AcademicSemester, UserRole } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await prisma.user.findFirst({
    where: {
      role: UserRole.STUDENT, // Correct usage with enum
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSem: AcademicSemester,
): Promise<string> => {
  const currentId = (await findLastStudentId()) || "00000";
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `${academicSem.year.toString().substring(2)}${academicSem.code}${incrementedId}`;
  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await prisma.user.findFirst({
    where: {
      role: UserRole.FACULTY, // Correct usage with enum
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = (await findLastFacultyId()) || "00000";
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await prisma.user.findFirst({
    where: {
      role: UserRole.ADMIN, // Correct usage with enum
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || "00000";
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `A-${incrementedId}`;
  return incrementedId;
};
