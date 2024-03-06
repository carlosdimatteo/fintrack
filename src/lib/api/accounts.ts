import { ENV } from "../config/env";
import { ErrorResponse, FinTrack } from "../types";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

export async function apiGetAccounts(): Promise<
  FinTrack.AccountListResponse | ErrorResponse
> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${ENV.API_ENDPOINT}/accounts`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<FinTrack.AccountListResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

export async function apiGetInvestmentAccounts(): Promise<
  FinTrack.AccountListResponse | ErrorResponse
> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${ENV.API_ENDPOINT}/investment-accounts`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<FinTrack.AccountListResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
