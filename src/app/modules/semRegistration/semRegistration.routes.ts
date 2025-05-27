import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { SemesterRegistrationControllers } from "./semRegistration.controllers";
import { SemesterRegistrationValidations } from "./semRegistration.validations";

const router = express.Router();

router
  .route("/start-registration")
  .post(
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.startMyRegistration,
  );

router
  .route("/get-my-registration")
  .get(
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.getMyRegistration,
  );

router
  .route("/enroll-into-course")
  .post(
    validateRequest(SemesterRegistrationValidations.enrollOrWithdrawCourse),
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.enrollIntoCourse,
  );

router
  .route("/withdraw-from-course")
  .post(
    validateRequest(SemesterRegistrationValidations.enrollOrWithdrawCourse),
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.withdrawFromCourse,
  );

router
  .route("/confirm-my-registration")
  .post(
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.confirmMyRegistration,
  );

router
  .route("/get-my-semsester-courses")
  .get(
    auth(USER_ROLES.STUDENT),
    SemesterRegistrationControllers.getMySemesterRegCourses,
  );

router
  .route("/")
  .post(
    validateRequest(SemesterRegistrationValidations.createSemesterRegistration),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    SemesterRegistrationControllers.insertIntoDB,
  )
  .get(SemesterRegistrationControllers.getAllFromDB);

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
    SemesterRegistrationControllers.deleteOneFromDB,
  );

router
  .route("/:id/start-new-semester")
  .post(
    auth(USER_ROLES.ADMIN),
    SemesterRegistrationControllers.startNewSemester,
  );

export const SemesterRegistrationRoutes = router;
