import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { semesterRegistrationFilterableFields } from "./semRegistration.constants";
import { SemesterRegistrationServices } from "./semRegistration.services";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await SemesterRegistrationServices.insertIntoDB(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Semester registration created successfully!!",
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
      const filters = pick(req.query, semesterRegistrationFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

      const result = await SemesterRegistrationServices.getAllFromDB(
        filters,
        options,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registrations fetched successfully!!",
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

      const result = await SemesterRegistrationServices.getByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration fetched successfully!!",
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

      const result = await SemesterRegistrationServices.updateOneInDB(
        id,
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration updated successfully!!",
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

      const result = await SemesterRegistrationServices.deleteByIdFromDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration deleted successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const startMyRegistration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await SemesterRegistrationServices.startMyRegistration(
        user!.userId,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student semester registration started successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const enrollIntoCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await SemesterRegistrationServices.enrollIntoCourse(
        user!.userId,
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student semester registration course enrolled successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const withdrawFromCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await SemesterRegistrationServices.withdrewFromCourse(
        user!.userId,
        req.body,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student withdraw from the course successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await SemesterRegistrationServices.confirmMyRegistration(
        user!.userId,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Confirm your registration!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getMyRegistration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await SemesterRegistrationServices.getMyRegistration(
        user!.userId,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My registration data fatched!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

// /:id/start-new-semester
const startNewSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await SemesterRegistrationServices.startNewSemester(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester started successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getMySemesterRegCouses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const result = await SemesterRegistrationServices.getMySemesterRegCouses(
        user!.userId,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My registration courses data fatched successfully!!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const SemesterRegistrationControllers = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  startMyRegistration,
  enrollIntoCourse,
  withdrawFromCourse,
  confirmMyRegistration,
  getMyRegistration,
  startNewSemester,
  getMySemesterRegCouses,
};
