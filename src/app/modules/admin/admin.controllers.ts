import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { adminFilterableFields } from "./admin.constants";
import { AdminServices } from "./admin.services";

// const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await AdminServices.insertIntoDB(req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin created successfully!!',
//     data: result,
//   });
// });

const getAllFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, adminFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await AdminServices.getAllFromDB(filters, options);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admins fetched successfully!!",
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

      const result = await AdminServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin fetched successfully!!",
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

      const result = await AdminServices.updateOneInDB(id, req.body);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin updated successfully!!",
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

      const result = await AdminServices.deleteByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin deleted successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const AdminControllers = {
  // insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
