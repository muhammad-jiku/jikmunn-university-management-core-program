import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { facultyFilterableFields } from "./faculty.constants";
import { FacultyServices } from "./faculty.services";

// const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await FacultyServices.insertIntoDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Faculty created successfully!!",
//     data: result,
//   });
// });

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, facultyFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await FacultyServices.getAllFromDB(filters, options);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculties fetched successfully!!",
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

      const result = await FacultyServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty fetched successfully!!",
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

      const result = await FacultyServices.updateOneInDB(id, req.body);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty updated successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const deleteByIdFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await FacultyServices.deleteByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty deleted successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const assignCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(req.body.faculties);

      const result = await FacultyServices.assignCourses(id, req.body.courses);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course faculty assigned successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const removeCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(req.body.faculties);

      const result = await FacultyServices.removeCourses(id, req.body.courses);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course faculty deleted successfully!!",
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
      const user = req!.user;
      const filter = pick(req.query, ["academicSemesterId", "courseId"]);
      const result = await FacultyServices.myCourses(user, filter);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My courses data fetched successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getMyCourseStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const filters = pick(req.query, [
        "academicSemesterId",
        "courseId",
        "offeredCourseSectionId",
      ]);
      const options = pick(req.query, ["limit", "page"]);

      const result = await FacultyServices.getMyCourseStudents(
        filters,
        options,
        user,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty course students fetched successfully!!",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const FacultyControllers = {
  // insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  assignCourses,
  removeCourses,
  myCourses,
  getMyCourseStudents,
};
