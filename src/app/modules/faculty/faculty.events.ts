import { RedisClient } from "../../../shared/redis";
import { UserServices } from "../user/user.services";
import {
  EVENT_FACULTY_CREATED,
  EVENT_FACULTY_UPDATED,
} from "./faculty.constants";
import { FacultyCreatedEvent } from "./faculty.interfaces";

const initFacultyEvents = () => {
  RedisClient.subscribe(EVENT_FACULTY_CREATED, async (e: string) => {
    const data: FacultyCreatedEvent = JSON.parse(e);

    await UserServices.createFacultyFromEvent(data);
  });

  RedisClient.subscribe(EVENT_FACULTY_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);
    await UserServices.updateFacultyFromEvent(data);
  });
};

export default initFacultyEvents;
