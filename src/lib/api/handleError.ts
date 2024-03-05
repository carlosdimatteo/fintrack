import { ErrorResponse } from "../types";

export function handleError(error: unknown): ErrorResponse {
  const message = (error as Error).message || "Something went wrong";

  return {
    success: false,
    message: message,
  };
}
