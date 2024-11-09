import { z } from "zod";

const createBuilding = z.object({
  body: z
    .object({
      title: z.string({
        required_error: "Title is required",
      }),
    })
    .strict(),
});

const updateBuilding = z.object({
  body: z
    .object({
      title: z.string().optional(),
    })
    .strict()
    .optional(),
});

export const BuildingValidations = {
  createBuilding,
  updateBuilding,
};
