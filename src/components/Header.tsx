import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import { buttonVariants } from "./ui/button";
import { CreditCard, HandCoins, Landmark, Receipt, Wallet } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-2 px-4 border-b-2 fixed bg-inherit z-50">
      <div className="w-full max-w-5xl mx-auto px-2 lg:px-0 flex flex-row justify-between items-center">
        <div className="flex items-center justify-start gap-2">
          <Link
            href="/expenses"
            className={`h-[2.5rem] w-[2.5rem] ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <Receipt className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          </Link>
          <Link
            href="/budgets"
            className={`h-[2.5rem] w-[2.5rem] ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <Wallet className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          </Link>
          <Link
            href="/investments"
            className={`h-[2.5rem] w-[2.5rem] ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <HandCoins className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          </Link>
          <Link
            href="/debts"
            className={`h-[2.5rem] w-[2.5rem] ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <CreditCard className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          </Link>
          <Link
            href="/accounting"
            className={`h-[2.5rem] w-[2.5rem] ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <Landmark className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          </Link>
        </div>
        <ThemeToggler />
      </div>
    </header>
  );
}
