import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { studentEnrolledCourseFilterableFields } from "./studentEnrolledCourse.constants";
import { StudentEnrolledCourseServices } from "./studentEnrolledCourse.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await StudentEnrolledCourseServices.insertIntoDB(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Student enrolled course created successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, studentEnrolledCourseFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await StudentEnrolledCourseServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student enrolled courses fetched successfully!!",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getByIdFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await StudentEnrolledCourseServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student enrolled course fetched successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const updateOneInDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await StudentEnrolledCourseServices.updateOneInDB(
        id,
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student enrolled course updated successfully",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const deleteOneFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await StudentEnrolledCourseServices.deleteOneFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student enrolled course deleted successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const StudentEnrolledCourseControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
