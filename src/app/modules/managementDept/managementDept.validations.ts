import { z } from "zod";

const createManagementDept = z.object({
  body: z
    .object({
      title: z.string({
        required_error: "Department name is required",
      }),
    })
    .strict(),
});

const updateManagementDept = z.object({
  body: z
    .object({
      title: z.string().optional(),
    })
    .strict()
    .optional(),
});

export const ManagementDeptValidations = {
  createManagementDept,
  updateManagementDept,
};
