import express from "express";
import { USER_ROLES } from "../../../enums/users";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { RoomControllers } from "./room.controllers";
import { RoomValidations } from "./room.validations";

const router = express.Router();

router
  .route("/")
  .post(
    validateRequest(RoomValidations.createRoom),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    RoomControllers.insertIntoDB,
  )
  .get(RoomControllers.getAllFromDB);

router
  .route("/:id")
  .get(RoomControllers.getByIdFromDB)
  .patch(
    validateRequest(RoomValidations.updateRoom),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    RoomControllers.updateOneInDB,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    RoomControllers.deleteOneFromDB,
  );

export const RoomRoutes = router;
