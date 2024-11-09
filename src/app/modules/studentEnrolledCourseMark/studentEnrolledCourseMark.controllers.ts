import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { studentEnrolledCourseMarkFilterableFields } from "./studentEnrolledCourseMark.constants";
import { StudentEnrolledCourseMarkServices } from "./studentEnrolledCourseMark.services";

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(
        req.query,
        studentEnrolledCourseMarkFilterableFields,
      );
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await StudentEnrolledCourseMarkServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student course marks fetched successfully!!",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  },
);

const updateStudentMarks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await StudentEnrolledCourseMarkServices.updateStudentMarks(
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "marks updated!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const updateFinalMarks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await StudentEnrolledCourseMarkServices.updateFinalMarks(
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Final marks updated!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getMyCourseMarks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const filters = pick(
        req.query,
        studentEnrolledCourseMarkFilterableFields,
      );
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await StudentEnrolledCourseMarkServices.getMyCourseMarks(
        filters,
        options,
        user,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student course marks fetched successfully",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const StudentEnrolledCourseMarkConrollers = {
  getAllFromDB,
  updateStudentMarks,
  updateFinalMarks,
  getMyCourseMarks,
};
