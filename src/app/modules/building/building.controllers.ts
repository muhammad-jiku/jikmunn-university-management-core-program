import { Building } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { buildingFilterableFields } from "./building.constants";
import { BuildingServices } from "./building.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BuildingServices.insertIntoDB(req.body);

      sendResponse<Building>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Building created successfully!!",
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
      const filters = pick(req.query, buildingFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await BuildingServices.getAllFromDB(filters, options);

      sendResponse<Building[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building fetched successfully!!",
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

      const result = await BuildingServices.getByIdFromDB(id);

      sendResponse<Building>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building fetched successfully!!",
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

      const result = await BuildingServices.updateOneInDB(id, req.body);

      sendResponse<Building>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building updated successfully!!",
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

      const result = await BuildingServices.deleteOneFromDB(id);

      sendResponse<Building>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building deleted successfully!",
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export const BuildingControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteOneFromDB,
};
