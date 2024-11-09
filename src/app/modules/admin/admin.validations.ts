import { BloodGroup, Gender } from "@prisma/client";
import { z } from "zod";

const updateAdmin = z.object({
  body: z
    .object({
      // adminId: z.string().optional(),
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
      managementDeptId: z.string().optional(),
    })
    .strict()
    .optional(),
});

export const AdminValidations = {
  updateAdmin,
};
