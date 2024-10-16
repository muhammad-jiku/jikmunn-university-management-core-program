import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { SemesterRegistrationControllers } from "./semRegistration.controllers";
import { SemesterRegistrationValidations } from "./semRegistration.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(SemesterRegistrationValidations.createSemesterRegistration),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    SemesterRegistrationControllers.insertIntoDB,
  )
  .get(SemesterRegistrationControllers.getAllFromDB);

router
  .route("/start-registration")
  .post(
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.startMyRegistration,
  );

router
  .route("/:id")
  .get(SemesterRegistrationControllers.getByIdFromDB)
  .patch(
    validateRequest(SemesterRegistrationValidations.updateSemesterRegistration),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    SemesterRegistrationControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    SemesterRegistrationControllers.deleteByIdFromDB,
  );

export const SemesterRegistrationRoutes = router;
