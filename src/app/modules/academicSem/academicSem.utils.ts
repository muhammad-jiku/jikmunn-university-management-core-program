import httpStatus from "http-status";
import ApiError from "../../../errors/handleApiError";
import { prisma } from "../../../shared/prisma";

export const validateDuplicateSem = async (title: string, year: number) => {
  const existingSem = await prisma.academicSemester.findFirst({
    where: {
      title,
      year,
    },
  });

  if (existingSem) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Academic Semester already exists!",
    );
  }
};
