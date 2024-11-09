import { RedisClient } from "../../../shared/redis";
import { UserServices } from "../user/user.services";
import {
  EVENT_STUDENT_CREATED,
  EVENT_STUDENT_UPDATED,
} from "./student.constants";

const initStudentEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    await UserServices.createStudentFromEvent(data);
  });

  RedisClient.subscribe(EVENT_STUDENT_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log("data..", data);
    await UserServices.updateStudentFromEvent(data);
  });
};

export default initStudentEvents;
