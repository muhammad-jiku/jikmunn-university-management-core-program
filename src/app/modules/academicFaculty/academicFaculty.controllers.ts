import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { academicFacultyFilterableFields } from "./academicFaculty.constants";
import { AcademicFacultyServices } from "./academicFaculty.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AcademicFacultyServices.insertIntoDB(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Academic faculty created successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, academicFacultyFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await AcademicFacultyServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculties fetched successfully!!",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getByIdFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AcademicFacultyServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty fetched successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const updateOneInDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AcademicFacultyServices.updateOneInDB(id, req.body);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty updated successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const deleteByIdFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await AcademicFacultyServices.deleteByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty deleted successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const AcademicFacultyControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
