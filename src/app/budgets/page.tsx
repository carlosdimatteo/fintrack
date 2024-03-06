import { AlertMessage } from "@/components/AlertDestructive";
import { BudgetView } from "@/components/BudgetView";
import { apiGetBudgets } from "@/lib/api";
import { ErrorResponse, FinTrack } from "@/lib/types";

export default async function Page() {
  const resBudgets = await apiGetBudgets();

  return (
    <main className="pt-2">
      {resBudgets.success ? (
        <BudgetView
          budgets={(resBudgets as FinTrack.BudgetListResponse).budgets}
        />
      ) : (
        <AlertMessage
          type="error"
          title="Error getting ToDo Lists"
          message={(resBudgets as ErrorResponse).message ?? "An error occurred"}
        />
      )}
    </main>
  );
}
