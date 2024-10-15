import express from "express";
import { AcademicDepartmentRoutes } from "../modules/academicDept/academicDept.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicSemesterRoutes } from "../modules/academicSem/academicSem.routes";
import { BuildingRoutes } from "../modules/building/building.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { RoomRoutes } from "../modules/room/room.routes";
import { StudentRoutes } from "../modules/student/student.routes";

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
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
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/buildings",
    route: BuildingRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
