import { ENV } from "../config/env";
import { ErrorResponse, FinTrack } from "../types";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

export async function apiCreateExpense(
  data: FinTrack.CreateExpenseInput
): Promise<FinTrack.CreateExpenseResponse | ErrorResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${ENV.API_ENDPOINT}/submit`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers,
  });

  return handleResponse<FinTrack.CreateExpenseResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
