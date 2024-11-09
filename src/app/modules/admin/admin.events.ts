import { RedisClient } from "../../../shared/redis";
import { UserServices } from "../user/user.services";
import { EVENT_ADMIN_CREATED, EVENT_ADMIN_UPDATED } from "./admin.constants";
import { AdminCreatedEvent } from "./admin.interfaces";

const initAdminEvents = () => {
  RedisClient.subscribe(EVENT_ADMIN_CREATED, async (e: string) => {
    const data: AdminCreatedEvent = JSON.parse(e);

    await UserServices.createAdminFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ADMIN_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);
    await UserServices.updateAdminFromEvent(data);
  });
};

export default initAdminEvents;
