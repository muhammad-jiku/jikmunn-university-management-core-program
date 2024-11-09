import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { offeredCourseClassScheduleFilterableFields } from "./offeredCourseSchedule.constants";
import { OfferedCourseClassScheduleServices } from "./offeredCourseSchedule.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await OfferedCourseClassScheduleServices.insertIntoDB(
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Offered course class schedule created successfully!!",
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
      const filters = pick(
        req.query,
        offeredCourseClassScheduleFilterableFields,
      );
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await OfferedCourseClassScheduleServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course class schedule fetched successfully!!",
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

      const result = await OfferedCourseClassScheduleServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course class schedule fetched successfully!!",
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

      const result = await OfferedCourseClassScheduleServices.updateOneInDB(
        id,
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course class schedule updated successfully!!",
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

      const result =
        await OfferedCourseClassScheduleServices.deleteByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered course class schedule deleted successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const OfferedCourseClassScheduleControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
