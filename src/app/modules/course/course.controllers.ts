import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { courseFilterableFields } from "./course.constants";
import { CourseServices } from "./course.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CourseServices.insertIntoDB(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Course created successufully!!",
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
      const filters = pick(req.query, courseFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await CourseServices.getAllFromDB(filters, options);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses fetched successfully!!",
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

      const result = await CourseServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course fetched successfully!!",
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

      const result = await CourseServices.updateOneInDB(id, req.body);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course updated successfully!!",
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

      const result = await CourseServices.deleteOneFromDB(id);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course deleted successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const assignFacultiesIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(req.body.faculties);

      const result = await CourseServices.assignFacultiesIntoDB(
        id,
        req.body.faculties,
      );

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

const removeFacultiesFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log(req.body.faculties);

      const result = await CourseServices.removeFacultiesFromDB(
        id,
        req.body.faculties,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course faculty removed successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const CourseControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
  assignFacultiesIntoDB,
  removeFacultiesFromDB,
};
