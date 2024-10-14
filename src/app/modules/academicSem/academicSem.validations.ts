import { z } from "zod";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSem.constants";

const createAcademicSemester = z.object({
  body: z.object({
    year: z.number({
      required_error: "Year is required",
    }),
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: "Title is required",
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: "Code is required",
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "Start month is required",
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: "End month is required",
    }),
  }),
});

const updateAcademicSemester = z.object({
  body: z.object({
    title: z
      .enum([...academicSemesterTitles] as [string, ...string[]])
      .optional(),
    code: z
      .enum([...academicSemesterCodes] as [string, ...string[]])
      .optional(),
    year: z.number().optional(),
    startMonth: z
      .enum([...academicSemesterMonths] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...academicSemesterMonths] as [string, ...string[]])
      .optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemester,
  updateAcademicSemester,
};
