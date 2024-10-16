import { Prisma } from "@prisma/client";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/error";

const handleValidationError = (
  err: Prisma.PrismaClientValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: "",
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation error!",
    errorMessages: errors,
  };
};

export default handleValidationError;
