"use client";

import { FinTrack } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { UpdateAccountForm } from "./UpdateAccountForm";
import { HandCoins, PencilLine } from "lucide-react";
import { updateAccounts } from "@/app/actions";
import { useState } from "react";

interface Props {
  accounts: FinTrack.Account[];
  investmentAccounts: FinTrack.Account[];
}
export function AccountView({ accounts, investmentAccounts }: Props) {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<FinTrack.Account>(accounts[0]);
  const [open, setOpen] = useState(false);

  const handleEditClick = (acc: FinTrack.Account) => {
    setAccount(acc);
    setOpen(true);
  };

  const handleAccountChange = async (account: FinTrack.Account) => {
    const data = {
      accounts: accounts.map((acc) => {
        if (acc.id === account.id) {
          return account;
        }
        return acc;
      }),
      investmentAccounts: investmentAccounts.map((acc) => {
        if (acc.id === account.id) {
          return account;
        }
        return acc;
      }),
    };

    setLoading(true);
    const result = await updateAccounts(data);

    setOpen(false);
    setLoading(false);
    return result;
  };

  return (
    <>
      {accounts.length > 0 || investmentAccounts.length > 0 ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <Table>
            <TableCaption>A list of your accounts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5"></TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="text-right">Balance (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell className="w-5">
                    <Button variant="link" onClick={() => handleEditClick(acc)}>
                      <PencilLine className="h-[1rem] w-[1rem]" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium text-blue-500">
                    {acc.name}
                  </TableCell>
                  <TableCell>{acc.currency}</TableCell>
                  <TableCell className="font-bold text-right">
                    {acc.balance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {investmentAccounts.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell className="w-5">
                    <Button variant="link" onClick={() => handleEditClick(acc)}>
                      <PencilLine className="h-[1rem] w-[1rem]" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium text-blue-500">
                    <span className="flex justify-start">
                      <HandCoins className="h-[1rem] w-[1rem] mr-2" />
                      {acc.name}
                    </span>
                  </TableCell>
                  <TableCell>{acc.currency}</TableCell>
                  <TableCell className="font-bold text-right">
                    {acc.balance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{account.name}</DrawerTitle>
                <DrawerDescription>
                  Update balance for {account.name}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <UpdateAccountForm
                  account={account}
                  loading={loading}
                  handleChange={handleAccountChange}
                />
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <p>No budgets found</p>
      )}
    </>
  );
}
