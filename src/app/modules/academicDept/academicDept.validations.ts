import { z } from "zod";

const createAcademicDept = z.object({
  body: z
    .object({
      title: z.string({
        required_error: "Title is required",
      }),
      academicFacultyId: z.string({
        required_error: "Academic faculty id is required",
      }),
    })
    .strict(),
});

const updateAcademicDept = z.object({
  body: z
    .object({
      title: z.string().optional(),
      academicFacultyId: z.string().optional(),
    })
    .strict()
    .optional(),
});

export const AcademicDeptValidations = {
  createAcademicDept,
  updateAcademicDept,
};
