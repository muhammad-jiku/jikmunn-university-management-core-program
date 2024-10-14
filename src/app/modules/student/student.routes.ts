import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentControllers } from "./student.controllers";
import { StudentValidations } from "./student.validations";

const router = express.Router();

router
  .route("/")
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(StudentValidations.createStudent),
    StudentControllers.insertIntoDB,
  )
  .get(StudentControllers.getAllFromDB);

router
  .route("/:id")
  .get(StudentControllers.getByIdFromDB)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(StudentValidations.updateStudent),
    StudentControllers.updateIntoDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    StudentControllers.deleteFromDB,
  );

export const StudentRoutes = router;
