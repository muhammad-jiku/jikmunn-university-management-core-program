import { ManagementDept, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { managementDeptSearchableFields } from "./managementDept.constants";
import { IManagementDeptFilterRequest } from "./managementDept.interfaces";

const insertIntoDB = async (data: ManagementDept): Promise<ManagementDept> => {
  const result = await prisma.managementDept.create({
    data,
  });

  return result;
};

const getAllFromDB = async (
  filters: IManagementDeptFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<ManagementDept[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: managementDeptSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditons: Prisma.ManagementDeptWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.managementDept.findMany({
    skip,
    take: limit,
    where: whereConditons,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.managementDept.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<ManagementDept | null> => {
  const result = await prisma.managementDept.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<ManagementDept>,
): Promise<ManagementDept> => {
  const result = await prisma.managementDept.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<ManagementDept> => {
  const result = await prisma.managementDept.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ManagementDeptServices = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
