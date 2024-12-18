import { AcademicSemester } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { academicSemesterFilterableFields } from "./academicSem.constants";
import { AcademicSemesterServices } from "./academicSem.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AcademicSemesterServices.insertIntoDB(req.body);

      sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Academic semester created successfully!!",
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
      const filters = pick(req.query, academicSemesterFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await AcademicSemesterServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semseter data fetched successfully!!",
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
      const result = await AcademicSemesterServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester data fetched successfully!!",
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
      const result = await AcademicSemesterServices.updateOneInDB(id, req.body);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester updated successfully",
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
      const result = await AcademicSemesterServices.deleteByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const AcademicSemeterControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
