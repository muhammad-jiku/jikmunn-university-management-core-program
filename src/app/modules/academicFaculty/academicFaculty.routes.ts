import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import { AcademicFacultyValidations } from "./academicFaculty.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(AcademicFacultyValidations.createAcademicFaculty),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicFacultyControllers.insertIntoDB,
  )
  .get(AcademicFacultyControllers.getAllFromDB);

router
  .route("/:id")
  .get(AcademicFacultyControllers.getByIdFromDB)
  .patch(
    validateRequest(AcademicFacultyValidations.updateAcademicFaculty),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicFacultyControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicFacultyControllers.deleteByIdFromDB,
  );

export const AcademicFacultyRoutes = router;
