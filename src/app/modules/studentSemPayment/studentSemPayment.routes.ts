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
  .route("/my-semester-payments")
  .get(
    auth(USER_ROLES.STUDENT),
    StudentSemesterPaymentControllers.getMySemesterPayments,
  );

router
  .route("/initiate-payment")
  .post(
    auth(USER_ROLES.STUDENT),
    StudentSemesterPaymentControllers.initiatePayment,
  );

router
  .route("/complete-payment")
  .post(
    auth(USER_ROLES.STUDENT),
    StudentSemesterPaymentControllers.completePayment,
  );

export const StudentSemesterPaymentRoutes = router;
