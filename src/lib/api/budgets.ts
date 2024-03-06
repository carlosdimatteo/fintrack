import { ENV } from "../config/env";
import { ErrorResponse, FinTrack } from "../types";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

export async function apiGetBudgets(): Promise<
  FinTrack.BudgetListResponse | ErrorResponse
> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${ENV.API_ENDPOINT}/budget`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<FinTrack.BudgetListResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
