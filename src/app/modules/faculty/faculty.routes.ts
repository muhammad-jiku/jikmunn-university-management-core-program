import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controllers";
import { FacultyValidations } from "./faculty.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(FacultyValidations.createFaculty),
    FacultyControllers.insertIntoDB,
  )
  .get(FacultyControllers.getAllFromDB);

router
  .route("/:id")
  .get(FacultyControllers.getByIdFromDB)
  .patch(
    validateRequest(FacultyValidations.updateFaculty),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    FacultyControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    FacultyControllers.deleteByIdFromDB,
  );

export const FacultyRoutes = router;
