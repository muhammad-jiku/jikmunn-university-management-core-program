import { Admin, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { adminSearchableFields } from "./admin.constants";
import { AdminCreatedEvent, IAdminFilterRequest } from "./admin.interfaces";

const insertIntoDB = async (data: Admin): Promise<Admin> => {
  const result = await prisma.admin.create({
    data,
    include: {
      managementDept: true,
    },
  });

  return result;
};

// Get all admins with filters and pagination
const getAllFromDB = async (
  filters: IAdminFilterRequest,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Admin[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.AdminWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: {
          equals: value,
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const admins = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : undefined,
  });

  const total = await prisma.admin.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: admins,
  };
};

// Get a single admin by ID
const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: { id },
  });
  return admin;
};

// Update an admin by ID
const updateOneInDB = async (
  id: string,
  payload: Prisma.AdminUpdateInput,
): Promise<Admin | null> => {
  const admin = await prisma.admin.update({
    where: { id },
    data: payload,
  });
  return admin;
};

// Delete an admin by ID
const deleteByIdFromDB = async (id: string): Promise<Admin | null> => {
  const deletedAdmin = await prisma.admin.delete({
    where: { id },
  });
  return deletedAdmin;
};

const createAdminFromEvent = async (e: AdminCreatedEvent): Promise<void> => {
  const admin: Partial<Admin> = {
    adminId: e.id,
    firstName: e.name.firstName,
    lastName: e.name.lastName,
    middleName: e.name.middleName,
    profileImage: e.profileImage,
    email: e.email,
    contactNo: e.contactNo,
    gender: e.gender,
    bloodGroup: e.bloodGroup,
    designation: e.designation,
    managementDeptId: e.managementDept.syncId,
  };

  const data = await insertIntoDB(admin as Admin);
  console.log("RES: ", data);
};

const updateAdminFromEvent = async (e: any): Promise<void> => {
  const isExist = await prisma.admin.findFirst({
    where: {
      adminId: e.id,
    },
  });
  if (!isExist) {
    createAdminFromEvent(e);
  } else {
    const adminData: Partial<Admin> = {
      adminId: e.id,
      firstName: e.name.firstName,
      lastName: e.name.lastName,
      middleName: e.name.middleName,
      profileImage: e.profileImage,
      email: e.email,
      contactNo: e.contactNo,
      gender: e.gender,
      bloodGroup: e.bloodGroup,
      designation: e.designation,
      managementDeptId: e.managementDept.syncId,
    };

    const res = await prisma.admin.updateMany({
      where: {
        adminId: e.id,
      },
      data: adminData,
    });
    console.log(res);
  }
};

export const AdminServices = {
  // insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  // createAdminFromEvent,
  // updateAdminFromEvent,
};
