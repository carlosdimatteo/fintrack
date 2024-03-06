export namespace FinTrack {
  export type Category = {
    id: number;
    name: string;
    description: string;
    is_essential: boolean;
  };

  export type CategoryListResponse = {
    success: boolean;
    categories: Category[];
  };

  export type Account = {
    id: number;
    name: string;
    description: string;
    type: string;
    currency: string;
    balance: number;
  };

  export type AccountListResponse = {
    success: boolean;
    accounts: Account[];
  };

  export type CreateExpenseInput = {
    category_id: number;
    category: string;
    expense: number;
    description: string;
    method: string;
    account_id: number | null;
    account_type: string;
  };

  export type CreateExpenseResponse = {
    success: boolean;
    message: string;
  };

  export type Budget = {
    amount: number;
    spent: number;
    category_name: string;
    caegory_id: number;
  };

  export type BudgetListResponse = {
    success: boolean;
    budgets: Budget[];
  };
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
