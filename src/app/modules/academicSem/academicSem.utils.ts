import httpStatus from "http-status";
import ApiError from "../../../errors/handleApiError";
import { prisma } from "../../../shared/prisma";

export const validateDuplicateSemester = async (
  title: string,
  year: number,
) => {
  const existingSemester = await prisma.academicSemester.findFirst({
    where: {
      title,
      year,
    },
  });

  if (existingSemester) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Academic semester already exists!",
    );
  }
};
