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
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
