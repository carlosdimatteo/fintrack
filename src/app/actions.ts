"use server";

import { apiCreateExpense, apiUpdateAccounts } from "@/lib/api";
import { FinTrack } from "@/lib/types";

export async function createExpense(data: FinTrack.CreateExpenseInput) {
  const result = await apiCreateExpense(data);
  return result;
}

export async function updateAccounts(data: FinTrack.UpdateAccountsInput) {
  const result = await apiUpdateAccounts(data);
  return result;
}
