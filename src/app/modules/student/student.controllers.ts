import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { studentFilterableFields } from "./student.constants";
import { StudentServices } from "./student.services";

// const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await StudentServices.insertIntoDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: "Student created successfully!!",
//     data: result,
//   });
// });

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, studentFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await StudentServices.getAllFromDB(filters, options);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students fetched successfully!!",
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

      const result = await StudentServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student fetched successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const updateIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const result = await StudentServices.updateIntoDB(id, payload);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student updated successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const deleteFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await StudentServices.deleteFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student deleted successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const myCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const filter = pick(req.query, ["courseId", "academicSemesterId"]);

      const result = await StudentServices.myCourses(user!.userId, filter);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student Courses data fetched successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getMyCourseSchedules = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const filter = pick(req.query, ["courseId", "academicSemesterId"]);

      const result = await StudentServices.getMyCourseSchedules(
        user!.userId,
        filter,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course Schedules data fetched successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const myAcademicInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await StudentServices.getMyAcademicInfo(user!.userId);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Academic info data fetched successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const StudentControllers = {
  // insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  myCourses,
  getMyCourseSchedules,
  myAcademicInfo,
};
