import { z } from "zod";

const createAcademicFaculty = z.object({
  body: z
    .object({
      title: z.string({
        required_error: "Title is required",
      }),
    })
    .strict(),
});

const updateAcademicFaculty = z.object({
  body: z
    .object({
      title: z.string().optional(),
    })
    .strict()
    .optional(),
});

export const AcademicFacultyValidations = {
  createAcademicFaculty,
  updateAcademicFaculty,
};
