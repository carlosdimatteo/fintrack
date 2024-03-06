"use client";

import { FinTrack } from "@/lib/types";
import { Card, CardContent, CardDescription } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Props {
  budgets: FinTrack.Budget[];
}
export function BudgetView({ budgets }: Props) {
  const budget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const spent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  const remaining = budget - spent;
  let spentColor = "text-green-500";
  // If spend > 50% of budget, show yellow
  if ((spent / budget) * 100 > 50) spentColor = "text-yellow-500";
  // If spend > 80% of budget, show red
  if ((spent / budget) * 100 > 80) spentColor = "text-red-500";

  return (
    <>
      <Card className="mb-4">
        <CardContent>
          <div className="pt-6">
            <CardDescription>Balance</CardDescription>

            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold">{remaining.toFixed(2)}</div>
              <div className="flex flex-col text-right">
                <div className={`font-bold ${spentColor}`}>
                  {spent.toFixed(2)}
                </div>
                <div>/ {budget.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {budgets.length > 0 ? (
        <Table>
          <TableCaption>A list of your budgets.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead className="text-right">Spent / Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets
              .sort((a, b) => b.amount - a.amount)
              .map((budget) => {
                // Trim category name is longer than 20 characters
                if (budget.category_name.length > 20)
                  budget.category_name =
                    budget.category_name.slice(0, 20) + "...";
                let spentColor = "text-green-500";
                if ((budget.spent / budget.amount) * 100 > 50)
                  spentColor = "text-yellow-500";
                if ((budget.spent / budget.amount) * 100 > 80)
                  spentColor = "text-red-500";

                return (
                  <TableRow key={budget.caegory_id}>
                    <TableCell className="font-medium text-blue-500">
                      {budget.category_name}
                    </TableCell>
                    <TableCell className="font-bold">
                      {(budget.amount - budget.spent).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <div className={spentColor}>
                          {budget.spent.toFixed(2)}
                        </div>
                        <div>/ {budget.amount.toFixed(2)}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <p>No budgets found</p>
      )}
    </>
  );
}
