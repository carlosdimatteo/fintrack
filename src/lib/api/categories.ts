import { ENV } from "../config/env";
import { ErrorResponse, FinTrack } from "../types";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

export async function getCategories(
  token?: string
): Promise<FinTrack.CategoryListResponse | ErrorResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${ENV.API_ENDPOINT}/categories`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<FinTrack.CategoryListResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
