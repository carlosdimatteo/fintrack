"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { ErrorResponse, FinTrack } from "@/lib/types";
import { Input } from "./ui/input";
import { UpdateAccountSchema } from "@/lib/validations/account.schema";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = UpdateAccountSchema;

interface Props {
  account: FinTrack.Account;
  loading: boolean;
  handleChange: (
    account: FinTrack.Account
  ) => Promise<FinTrack.UpdateAccountsResponse | ErrorResponse>;
}
export function UpdateAccountForm({ account, loading, handleChange }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: account.id,
      name: account.name,
      description: account.description,
      currency: account.currency,
      type: account.type,
      balance: account.balance,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await handleChange(values);

    if (result.success) {
      toast({
        title: "Account updated!",
        description: "Your account has been updated successfully.",
      });
      router.refresh();
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
