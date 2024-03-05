import { create } from "zustand";

type Store = {
  requestLoading: boolean;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  requestLoading: false,
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ requestLoading: false }),
}));

export default useStore;
