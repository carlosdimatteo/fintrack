import { AccountView } from "@/components/AccountView";
import { AlertMessage } from "@/components/AlertDestructive";
import { apiGetAccounts, apiGetInvestmentAccounts } from "@/lib/api";
import { ErrorResponse, FinTrack } from "@/lib/types";

export default async function Page() {
  const resAccounts = await apiGetAccounts();
  const resInvestmentAccounts = await apiGetInvestmentAccounts();

  return (
    <main className="pt-2">
      {resAccounts.success && resInvestmentAccounts.success ? (
        <AccountView
          accounts={(resAccounts as FinTrack.AccountListResponse).accounts}
          investmentAccounts={
            (resInvestmentAccounts as FinTrack.AccountListResponse).accounts
          }
        />
      ) : (
        <AlertMessage
          type="error"
          title="Error getting ToDo Lists"
          message={
            (resAccounts as ErrorResponse).message ??
            (resInvestmentAccounts as ErrorResponse).message ??
            "An error occurred"
          }
        />
      )}
    </main>
  );
}
