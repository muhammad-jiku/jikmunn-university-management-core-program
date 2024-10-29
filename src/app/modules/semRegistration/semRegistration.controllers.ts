import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { semesterRegistrationFilterableFields } from "./semRegistration.constants";
import { SemesterRegistrationServices } from "./semRegistration.services";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationServices.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Semester registration created successfully!!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
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
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SemesterRegistrationServices.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration fetched successfully!!",
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SemesterRegistrationServices.updateOneInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration updated successfully!!",
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SemesterRegistrationServices.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration deleted successfully!!",
    data: result,
  });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
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
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
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
});

const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
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
});

const confirmMyRegistration = catchAsync(
  async (req: Request, res: Response) => {
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
  },
);

const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
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
});

const startNewSemester = catchAsync(async (req: Request, res: Response) => {
  // /:id/start-new-semester
  const { id } = req.params;

  const result = await SemesterRegistrationServices.startNewSemester(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester started successfully!",
    data: result,
  });
});

const getMySemesterRegCouses = catchAsync(
  async (req: Request, res: Response) => {
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
