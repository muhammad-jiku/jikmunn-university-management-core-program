import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { BuildingControllers } from "./building.controllers";
import { BuildingValidations } from "./building.validations";

const router = express.Router();

router
  .route("/")
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(BuildingValidations.createBuilding),
    BuildingControllers.insertIntoDB,
  )
  .get(BuildingControllers.getAllFromDB);

router
  .route("/:id")
  .get(BuildingControllers.getByIdFromDB)
  .patch(
    validateRequest(BuildingValidations.updateBuilding),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    BuildingControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    BuildingControllers.deleteByIdFromDB,
  );

export const BuildingRoutes = router;
