import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { CourseControllers } from "./course.controllers";
import { CourseValidations } from "./course.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(CourseValidations.createCourse),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CourseControllers.insertIntoDB,
  )
  .get(CourseControllers.getAllFromDB);

router
  .route("/:id")
  .get(CourseControllers.getByIdFromDB)
  .patch(
    validateRequest(CourseValidations.updateCourse),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CourseControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CourseControllers.deleteOneFromDB,
  );

router
  .route("/:id/assign-faculties")
  .post(
    validateRequest(CourseValidations.assignOrRemoveFaculties),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CourseControllers.assignFacultiesIntoDB,
  );

router.delete(
  "/:id/remove-faculties",
  validateRequest(CourseValidations.assignOrRemoveFaculties),
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  CourseControllers.removeFacultiesFromDB,
);

export const CourseRoutes = router;
