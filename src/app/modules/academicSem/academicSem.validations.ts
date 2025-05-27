import { z } from "zod";
import {
  academicSemCodes,
  academicSemMonths,
  academicSemTitles,
} from "./academicSem.constants";

const createAcademicSem = z.object({
  body: z
    .object({
      year: z.number({
        required_error: "Year is required",
      }),
      title: z.enum([...academicSemTitles] as [string, ...string[]], {
        required_error: "Title is required",
      }),
      code: z.enum([...academicSemCodes] as [string, ...string[]], {
        required_error: "Code is required",
      }),
      startMonth: z.enum([...academicSemMonths] as [string, ...string[]], {
        required_error: "Start month is required",
      }),
      endMonth: z.enum([...academicSemMonths] as [string, ...string[]], {
        required_error: "End month is required",
      }),
    })
    .strict(),
});

const updateAcademicSem = z.object({
  body: z
    .object({
      title: z.enum([...academicSemTitles] as [string, ...string[]]).optional(),
      code: z.enum([...academicSemCodes] as [string, ...string[]]).optional(),
      year: z.number().optional(),
      startMonth: z
        .enum([...academicSemMonths] as [string, ...string[]])
        .optional(),
      endMonth: z
        .enum([...academicSemMonths] as [string, ...string[]])
        .optional(),
    })
    .strict()
    .optional(),
});

export const AcademicSemValidations = {
  createAcademicSem,
  updateAcademicSem,
};
