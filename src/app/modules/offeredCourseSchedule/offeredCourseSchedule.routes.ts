import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { OfferedCourseClassScheduleControllers } from "./offeredCourseSchedule.controllers";
import { OfferedCourseClassScheduleValidations } from "./offeredCourseSchedule.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(
      OfferedCourseClassScheduleValidations.createOfferedCourseClassSchedule,
    ),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    OfferedCourseClassScheduleControllers.insertIntoDB,
  )
  .get(OfferedCourseClassScheduleControllers.getAllFromDB);

router
  .route("/:id")
  .get(OfferedCourseClassScheduleControllers.getByIdFromDB)
  .patch(
    validateRequest(
      OfferedCourseClassScheduleValidations.updateOfferedCourseClassSchedule,
    ),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    OfferedCourseClassScheduleControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    OfferedCourseClassScheduleControllers.deleteOneFromDB,
  );

export const OfferedCourseClassScheduleRoutes = router;
