import { AcademicSemester, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/handleApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { RedisClient } from "../../../shared/redis";
import {
  academicSemSearchableFields,
  academicSemTitleCodeMapper,
  EVENT_ACADEMIC_SEM_CREATED,
  EVENT_ACADEMIC_SEM_DELETED,
  EVENT_ACADEMIC_SEM_UPDATED,
} from "./academicSem.constants";
import { IAcademicSemFilterRequest } from "./academicSem.interfaces";
import { validateDuplicateSem } from "./academicSem.utils";

const insertIntoDB = async (
  academicSemesterData: AcademicSemester,
): Promise<AcademicSemester> => {
  // Validate for duplicates
  await validateDuplicateSem(
    academicSemesterData.title,
    academicSemesterData.year,
  );

  if (
    academicSemTitleCodeMapper[academicSemesterData.title] !==
    academicSemesterData.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });

  console.log(result, "result core");

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEM_CREATED,
      JSON.stringify(result),
    );
  }

  return result;
};

const getAllFromDB = async (
  filters: IAcademicSemFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(options);
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: academicSemSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.AcademicSemesterWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicSemester>,
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEM_UPDATED,
      JSON.stringify(result),
    );
  }
  return result;
};

const deleteOneFromDB = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_SEM_DELETED,
      JSON.stringify(result),
    );
  }
  return result;
};

export const AcademicSemServices = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
