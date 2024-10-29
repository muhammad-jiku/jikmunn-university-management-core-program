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
  .route("/my-courses")
  .get(auth(USER_ROLES.STUDENT), StudentControllers.myCourses);

router
  .route("/my-course-schedules")
  .get(auth(USER_ROLES.STUDENT), StudentControllers.getMyCourseSchedules);

router
  .route("/my-academic-info")
  .get(auth(USER_ROLES.STUDENT), StudentControllers.myAcademicInfo);

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
