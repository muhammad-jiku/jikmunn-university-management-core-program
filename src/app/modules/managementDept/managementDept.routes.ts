import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { ManagementDeptControllers } from "./managementDept.controllers";
import { ManagementDeptValidations } from "./managementDept.validations";

const router = express.Router();

router
  .route("/")
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(ManagementDeptValidations.createManagementDept),
    ManagementDeptControllers.insertIntoDB,
  )
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ManagementDeptControllers.getAllFromDB,
  );

router
  .route("/:id")
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ManagementDeptControllers.getByIdFromDB,
  )
  .patch(
    validateRequest(ManagementDeptValidations.updateManagementDept),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ManagementDeptControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    ManagementDeptControllers.deleteByIdFromDB,
  );

export const ManagementDeptRoutes = router;
