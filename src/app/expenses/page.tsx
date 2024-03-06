import { AlertMessage } from "@/components/AlertDestructive";
import { CreateExpenseForm } from "@/components/CreateExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  apiGetAccounts,
  apiGetInvestmentAccounts,
  apiGetCategories,
} from "@/lib/api";
import { ErrorResponse, FinTrack } from "@/lib/types";

export default async function Page() {
  const resCategories = await apiGetCategories();
  const resAccounts = await apiGetAccounts();
  const resInvestmentAccounts = await apiGetInvestmentAccounts();

  return (
    <main className="pt-2 flex items-center justify-center w-full">
      {resCategories.success &&
      resAccounts.success &&
      resInvestmentAccounts.success ? (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateExpenseForm
              accounts={(resAccounts as FinTrack.AccountListResponse).accounts}
              investmentAccounts={
                (resInvestmentAccounts as FinTrack.AccountListResponse).accounts
              }
              categories={
                (resCategories as FinTrack.CategoryListResponse).categories
              }
            />
          </CardContent>
        </Card>
      ) : (
        <AlertMessage
          type="error"
          title="Error getting ToDo Lists"
          message={
            (resCategories as ErrorResponse).message ??
            (resAccounts as ErrorResponse).message ??
            (resInvestmentAccounts as ErrorResponse).message ??
            "An error occurred"
          }
        />
      )}
    </main>
  );
}
