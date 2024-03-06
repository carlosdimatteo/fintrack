"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { ErrorResponse, FinTrack } from "@/lib/types";
import { CreateExpenseSchema } from "@/lib/validations/expense.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { CURRENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { Input } from "./ui/input";
import { createExpense } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = CreateExpenseSchema;

interface Props {
  categories: FinTrack.Category[];
  accounts: FinTrack.Account[];
  investmentAccounts: FinTrack.Account[];
}
export function CreateExpenseForm({
  categories,
  accounts,
  investmentAccounts,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "USD",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const foundAccount = accounts.find((a) => values.method.includes(a.name));
    const foundInvestmentAccount = investmentAccounts.find((a) =>
      values.method.includes(a.name)
    );
    const isUSD = values.currency === "USD";

    const data = {
      category_id: values.category,
      category: categories.find((c) => c.id === values.category)!.name,
      expense: isUSD
        ? values.amount
        : Number((values.amount / 4000).toFixed(2)),
      description: values.description,
      method: values.method,
      account_id: foundAccount?.id ?? foundInvestmentAccount?.id ?? null,
      account_type: foundAccount ? "account" : "investment_account",
    };
    const result = await createExpense(data);

    if (result.success) {
      toast({
        title: "Expense added!",
        description: "Your expense has been added successfully.",
      });
      form.reset();
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
    setLoading(false);
  }

  function clearForm() {
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(Number(value));
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30.00"
                      {...field}
                      onChange={(event) => {
                        field.onChange(Number(event.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PAYMENT_METHODS.map((pm) => (
                    <SelectItem key={pm.value} value={pm.value}>
                      {pm.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Describe your expense..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center justify-between w-full gap-4 pt-2">
          <Button variant="outline" onClick={clearForm}>
            Clear
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
