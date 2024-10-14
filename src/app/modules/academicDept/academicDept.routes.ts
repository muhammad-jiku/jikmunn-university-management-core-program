import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicDepartmentControllers } from "./academicDept.controllers";
import { AcademicDepartmentValidations } from "./academicDept.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(AcademicDepartmentValidations.createAcademicDepartment),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDepartmentControllers.insertIntoDB,
  )
  .get(AcademicDepartmentControllers.getAllFromDB);

router
  .route("/:id")
  .get(AcademicDepartmentControllers.getByIdFromDB)
  .patch(
    validateRequest(AcademicDepartmentValidations.updateAcademicDepartment),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDepartmentControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    AcademicDepartmentControllers.deleteByIdFromDB,
  );

export const AcademicDepartmentRoutes = router;
