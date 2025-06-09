import express from "express";
import { AcademicDeptRoutes } from "../modules/academicDept/academicDept.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicSemRoutes } from "../modules/academicSem/academicSem.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { BuildingRoutes } from "../modules/building/building.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse.routes";
import { OfferedCourseClassScheduleRoutes } from "../modules/offeredCourseSchedule/offeredCourseSchedule.routes";
import { OfferedCourseSectionRoutes } from "../modules/offeredCourseSection/offeredCourseSection.routes";
import { RoomRoutes } from "../modules/room/room.routes";
import { SemesterRegistrationRoutes } from "../modules/semRegistration/semRegistration.routes";
import { StudentRoutes } from "../modules/student/student.routes";
import { StudentEnrolledCourseRoutes } from "../modules/studentEnrolledCourse/studentEnrolledCourse.routes";
import { StudentEnrolledCourseMarkRoutes } from "../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.routes";
import { StudentSemesterPaymentRoutes } from "../modules/studentSemPayment/studentSemPayment.routes";
import { UserRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    route: AcademicSemRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDeptRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/buildings",
    route: BuildingRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: SemesterRegistrationRoutes,
  },
  {
    path: "/offered-courses",
    route: OfferedCourseRoutes,
  },
  {
    path: "/offered-course-sections",
    route: OfferedCourseSectionRoutes,
  },
  {
    path: "/offered-course-class-schedules",
    route: OfferedCourseClassScheduleRoutes,
  },
  {
    path: "/student-enrolled-courses",
    route: StudentEnrolledCourseRoutes,
  },
  {
    path: "/student-enrolled-course-marks",
    route: StudentEnrolledCourseMarkRoutes,
  },
  {
    path: "/student-semester-payments",
    route: StudentSemesterPaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
