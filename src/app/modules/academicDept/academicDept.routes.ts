import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicDeptControllers } from "./academicDept.controllers";
import { AcademicDeptValidations } from "./academicDept.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(AcademicDeptValidations.createAcademicDept),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDeptControllers.insertIntoDB,
  )
  .get(AcademicDeptControllers.getAllFromDB);

router
  .route("/:id")
  .get(AcademicDeptControllers.getByIdFromDB)
  .patch(
    validateRequest(AcademicDeptValidations.updateAcademicDept),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDeptControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDeptControllers.deleteOneFromDB,
  );

export const AcademicDeptRoutes = router;
