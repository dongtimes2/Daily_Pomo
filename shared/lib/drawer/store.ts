import { create } from "zustand";

interface IDrawerState {
  show: boolean;
  content: React.ReactNode | null;
  open: (content: React.ReactNode) => void;
  close: () => void;
}

export const useDrawerStore = create<IDrawerState>()((set) => ({
  show: false,
  content: null,

  open: (content: React.ReactNode) => set({ show: true, content }),
  close: () => set({ show: false, content: null }),
}));
