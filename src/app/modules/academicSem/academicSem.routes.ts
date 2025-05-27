import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicSemControllers } from "./academicSem.controllers";
import { AcademicSemValidations } from "./academicSem.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(AcademicSemValidations.createAcademicSem),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemControllers.insertIntoDB,
  )
  .get(AcademicSemControllers.getAllFromDB);

router
  .route("/:id")
  .get(AcademicSemControllers.getByIdFromDB)
  .patch(
    validateRequest(AcademicSemValidations.updateAcademicSem),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicSemControllers.deleteOneFromDB,
  );

export const AcademicSemRoutes = router;
