import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { studentSemesterPaymentFilterableFields } from "./studentSemPayment.constants";
import { StudentSemesterPaymentServices } from "./studentSemPayment.services";

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, studentSemesterPaymentFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await StudentSemesterPaymentServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student semester payment fetched successfully",
        meta: result.meta,
        data: result.data,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const initiatePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      console.log(user);
      const result = await StudentSemesterPaymentServices.initiatePayment(
        req.body,
        user,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment initiated!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const StudentSemesterPaymentControllers = {
  getAllFromDB,
  initiatePayment,
};
