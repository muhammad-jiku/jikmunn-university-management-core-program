import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controllers";
import { UserValidations } from "./user.validations";

const router = express.Router();

router
  .route("/create-student")
  .post(
    validateRequest(UserValidations.createStudent),
    UserControllers.insertStudentIntoDB,
  );

router
  .route("/create-faculty")
  .post(
    validateRequest(UserValidations.createFaculty),
    UserControllers.insertFacultyIntoDB,
  );

router
  .route("/create-admin")
  .post(
    validateRequest(UserValidations.createAdmin),
    UserControllers.insertAdminIntoDB,
  );

export const UserRoutes = router;
