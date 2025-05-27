import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { UserServices } from "./user.services";

const insertStudentIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { student, ...userData } = req.body;
      const result = await UserServices.insertStudentIntoDB(student, userData);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const insertFacultyIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { faculty, ...userData } = req.body;
      const result = await UserServices.insertFacultyIntoDB(faculty, userData);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const insertAdminIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { admin, ...userData } = req.body;
      const result = await UserServices.insertAdminIntoDB(admin, userData);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully!!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const UserControllers = {
  insertStudentIntoDB,
  insertFacultyIntoDB,
  insertAdminIntoDB,
};
