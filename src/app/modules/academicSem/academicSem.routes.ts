import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicSemeterControllers } from "./academicSem.controllers";
import { AcademicSemesterValidations } from "./academicSem.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(AcademicSemesterValidations.createAcademicSemester),
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    AcademicSemeterControllers.insertIntoDB,
  )
  .get(AcademicSemeterControllers.getAllFromDB);

router
  .route("/:id")
  .get(AcademicSemeterControllers.getDataById)
  .patch(
    validateRequest(AcademicSemesterValidations.updateAcademicSemester),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemeterControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemeterControllers.deleteByIdFromDB,
  );

export const AcademicSemesterRoutes = router;
