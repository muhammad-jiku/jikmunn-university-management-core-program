import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { OfferedCourseControllers } from "./offeredCourse.controllers";
import { OfferedCourseValidations } from "./offeredCourse.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(OfferedCourseValidations.createOfferedCourse),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    OfferedCourseControllers.insertIntoDB,
  )
  .get(OfferedCourseControllers.getAllFromDB);

router
  .route("/:id")
  .get(OfferedCourseControllers.getByIdFromDB)
  .patch(
    validateRequest(OfferedCourseValidations.updateOfferedCourse),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    OfferedCourseControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    OfferedCourseControllers.deleteByIdFromDB,
  );

export const OfferedCourseRoutes = router;
