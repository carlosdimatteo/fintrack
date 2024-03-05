import { AlertMessage } from "@/components/AlertDestructive";
import { CreateExpenseForm } from "@/components/CreateExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/api/categories";
import { ErrorResponse, FinTrack } from "@/lib/types";

export default async function Page() {
  const res = await getCategories();

  return (
    <main className="pt-2">
      {res.success ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateExpenseForm
              categories={(res as FinTrack.CategoryListResponse).categories}
            />
          </CardContent>
        </Card>
      ) : (
        <AlertMessage
          type="error"
          title="Error getting ToDo Lists"
          message={(res as ErrorResponse).message}
        />
      )}
    </main>
  );
}
