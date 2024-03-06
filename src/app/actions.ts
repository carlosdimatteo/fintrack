"use server";

import { apiCreateExpense } from "@/lib/api";
import { FinTrack } from "@/lib/types";

export async function createExpense(data: FinTrack.CreateExpenseInput) {
  const result = await apiCreateExpense(data);
  return result;
}
