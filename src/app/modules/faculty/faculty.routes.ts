import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controllers";
import { FacultyValidations } from "./faculty.validations";

const router = express.Router();

router.route("/").get(FacultyControllers.getAllFromDB);

router
  .route("/my-courses")
  .get(auth(USER_ROLES.FACULTY), FacultyControllers.myCourses);

router
  .route("/my-course-students")
  .get(auth(USER_ROLES.FACULTY), FacultyControllers.getMyCourseStudents);

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

router
  .route("/:id/assign-courses")
  .post(
    validateRequest(FacultyValidations.assignOrRemoveCourses),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    FacultyControllers.assignCourses,
  );

router
  .route("/:id/remove-courses")
  .delete(
    validateRequest(FacultyValidations.assignOrRemoveCourses),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    FacultyControllers.removeCourses,
  );

export const FacultyRoutes = router;
