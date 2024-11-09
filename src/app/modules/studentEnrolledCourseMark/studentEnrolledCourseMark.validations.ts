import { ExamType } from "@prisma/client";
import { z } from "zod";

const updateStudentMarks = z.object({
  body: z
    .object({
      academicSemesterId: z
        .string({
          required_error: "Academic semester id is required",
        })
        .optional(),
      studentId: z
        .string({
          required_error: "Student id is required",
        })
        .optional(),
      courseId: z
        .string({
          required_error: "Course id is required",
        })
        .optional(),
      examType: z
        .enum([...Object.values(ExamType)] as [string, ...string[]], {})
        .optional(),
      marks: z
        .number({
          required_error: "Marks is required",
        })
        .max(100)
        .min(0)
        .optional(),
    })
    .strict()
    .optional(),
});

const updateStudentCourseFinalMarks = z.object({
  body: z
    .object({
      academicSemesterId: z
        .string({
          required_error: "Academic semester id is required",
        })
        .optional(),
      studentId: z
        .string({
          required_error: "Student id is required",
        })
        .optional(),
      courseId: z
        .string({
          required_error: "Course id is required",
        })
        .optional(),
    })
    .strict()
    .optional(),
});

export const StudentEnrolledCourseMarkValidations = {
  updateStudentMarks,
  updateStudentCourseFinalMarks,
};
