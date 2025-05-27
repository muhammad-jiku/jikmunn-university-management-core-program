import { AcademicDepartment, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { RedisClient } from "../../../shared/redis";
import {
  academicDeptRelationalFields,
  academicDeptRelationalFieldsMapper,
  academicDeptSearchableFields,
  EVENT_ACADEMIC_DEPT_CREATED,
  EVENT_ACADEMIC_DEPT_DELETED,
  EVENT_ACADEMIC_DEPT_UPDATED,
} from "./academicDept.constants";
import { IAcademicDeptFilterRequest } from "./academicDept.interfaces";

const insertIntoDB = async (
  data: AcademicDepartment,
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPT_CREATED,
      JSON.stringify(result),
    );
  }

  return result;
};

const getAllFromDB = async (
  filters: IAcademicDeptFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDeptSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (academicDeptRelationalFields.includes(key)) {
          return {
            [academicDeptRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    include: {
      academicFaculty: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.academicDepartment.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (
  id: string,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicDepartment>,
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicFaculty: true,
    },
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPT_UPDATED,
      JSON.stringify(result),
    );
  }
  return result;
};

const deleteOneFromDB = async (id: string): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPT_DELETED,
      JSON.stringify(result),
    );
  }
  return result;
};

export const AcademicDeptServices = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
