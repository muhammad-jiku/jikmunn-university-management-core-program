import { BloodGroup, Gender } from "@prisma/client";
import { z } from "zod";

const updateFaculty = z.object({
  body: z
    .object({
      // facultyId: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
      profileImage: z.string().optional(),
      // email: z.string().optional(),
      // contactNo: z.string().optional(),
      gender: z.enum(Object.values(Gender) as [string, ...string[]]).optional(),
      bloodGroup: z
        .enum(Object.values(BloodGroup) as [string, ...string[]])
        .optional(),
      designation: z.string().optional(),
      academicDepartmentId: z.string().optional(),
      academicFacultyId: z.string().optional(),
    })
    .strict()
    .optional(),
});

const assignOrRemoveCourses = z.object({
  body: z
    .object({
      courses: z.array(z.string(), {
        required_error: "Courses are required",
      }),
    })
    .strict(),
});

export const FacultyValidations = {
  updateFaculty,
  assignOrRemoveCourses,
};
