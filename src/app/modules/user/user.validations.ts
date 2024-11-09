import { BloodGroup, Gender } from "@prisma/client";
import { z } from "zod";

const createStudent = z.object({
  body: z
    .object({
      password: z.string().optional(),
      student: z
        .object({
          firstName: z.string({
            required_error: "First name is required",
          }),
          lastName: z.string({
            required_error: "Last name is required",
          }),
          middleName: z.string({
            required_error: "Middle name is required",
          }),
          profileImage: z.string({
            required_error: "Profile image is required",
          }),
          email: z.string({
            required_error: "Email is required",
          }),
          contactNo: z.string({
            required_error: "Contact no is required",
          }),
          gender: z.enum(Object.values(Gender) as [string, ...string[]], {
            required_error: "Gender is required",
          }),
          bloodGroup: z.enum(
            Object.values(BloodGroup) as [string, ...string[]],
            {
              required_error: "Blood group is required",
            },
          ),
          academicSemesterId: z.string({
            required_error: "Academic semester is required",
          }),
          academicDepartmentId: z.string({
            required_error: "Academic department is required",
          }),
          academicFacultyId: z.string({
            required_error: "Academic faculty is required",
          }),
        })
        .strict(),
    })
    .strict(),
});

const createFaculty = z.object({
  body: z
    .object({
      password: z.string().optional(),
      faculty: z
        .object({
          firstName: z.string({
            required_error: "First name is required",
          }),
          lastName: z.string({
            required_error: "Last name is required",
          }),
          middleName: z.string({
            required_error: "Middle name is required",
          }),
          profileImage: z.string({
            required_error: "Profile image is required",
          }),
          email: z.string({
            required_error: "Email is required",
          }),
          contactNo: z.string({
            required_error: "Contact no is required",
          }),
          gender: z.enum(Object.values(Gender) as [string, ...string[]], {
            required_error: "Gender is required",
          }),
          bloodGroup: z.enum(
            Object.values(BloodGroup) as [string, ...string[]],
            {
              required_error: "Blood group is required",
            },
          ),
          designation: z.string({
            required_error: "Designation is required",
          }),
          academicDepartmentId: z.string({
            required_error: "Academic department is required",
          }),
          academicFacultyId: z.string({
            required_error: "Academic faculty is required",
          }),
        })
        .strict(),
    })
    .strict(),
});

const createAdmin = z.object({
  body: z
    .object({
      password: z.string().optional(),
      admin: z
        .object({
          firstName: z.string({
            required_error: "First name is required",
          }),
          lastName: z.string({
            required_error: "Last name is required",
          }),
          middleName: z.string({
            required_error: "Middle name is required",
          }),
          profileImage: z.string({
            required_error: "Profile image is required",
          }),
          email: z.string({
            required_error: "Email is required",
          }),
          contactNo: z.string({
            required_error: "Contact no is required",
          }),
          gender: z.enum(Object.values(Gender) as [string, ...string[]], {
            required_error: "Gender is required",
          }),
          bloodGroup: z.enum(
            Object.values(BloodGroup) as [string, ...string[]],
            {
              required_error: "Blood group is required",
            },
          ),
          designation: z.string({
            required_error: "Designation is required",
          }),
          managementDeptmentId: z.string({
            required_error: "Management department is required",
          }),
        })
        .strict(),
    })
    .strict(),
});

export const UserValidations = {
  createStudent,
  createFaculty,
  createAdmin,
};
