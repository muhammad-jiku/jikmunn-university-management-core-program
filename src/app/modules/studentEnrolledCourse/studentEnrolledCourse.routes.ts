import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentEnrolledCourseControllers } from "./studentEnrolledCourse.controllers";
import { StudentEnrolledCourseValidations } from "./studentEnrolledCourse.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(StudentEnrolledCourseValidations.create),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    StudentEnrolledCourseControllers.insertIntoDB,
  )
  .get(StudentEnrolledCourseControllers.getAllFromDB);

router
  .route("/:id")
  .get(StudentEnrolledCourseControllers.getByIdFromDB)
  .patch(
    validateRequest(StudentEnrolledCourseValidations.update),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    StudentEnrolledCourseControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    StudentEnrolledCourseControllers.deleteByIdFromDB,
  );

export const StudentEnrolledCourseRoutes = router;
