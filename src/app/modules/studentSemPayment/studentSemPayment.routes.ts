import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { StudentSemesterPaymentControllers } from "./studentSemPayment.controllers";

const router = express.Router();

router
  .route("/")
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.FACULTY),
    StudentSemesterPaymentControllers.getAllFromDB,
  );

router
  .route("/initiate-payment")
  .post(
    auth(USER_ROLES.STUDENT),
    StudentSemesterPaymentControllers.initiatePayment,
  );

export const StudentSemesterPaymentRoutes = router;
