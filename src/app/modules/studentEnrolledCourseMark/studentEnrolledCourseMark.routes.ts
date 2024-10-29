import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentEnrolledCourseMarkConrollers } from "./studentEnrolledCourseMark.controllers";
import { StudentEnrolledCourseMarkValidations } from "./studentEnrolledCourseMark.validations";

const router = express.Router();

router
  .route("/")
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    StudentEnrolledCourseMarkConrollers.getAllFromDB,
  );

router
  .route("/my-marks")
  .get(
    auth(USER_ROLES.STUDENT),
    StudentEnrolledCourseMarkConrollers.getMyCourseMarks,
  );

router
  .route("/update-marks")
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    validateRequest(StudentEnrolledCourseMarkValidations.updateStudentMarks),
    StudentEnrolledCourseMarkConrollers.updateStudentMarks,
  );

router
  .route("/update-final-marks")
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    validateRequest(
      StudentEnrolledCourseMarkValidations.updateStudentCourseFinalMarks,
    ),
    StudentEnrolledCourseMarkConrollers.updateFinalMarks,
  );

export const StudentEnrolledCourseMarkRoutes = router;
