import { create } from "zustand";

import { TMode } from "@/entities";

interface IModeState {
  mode: TMode;
  setMode: (arg: TMode | ((prev: TMode) => TMode)) => void;
}

export const useModeStore = create<IModeState>()((set) => ({
  mode: "WORK",

  setMode: (arg) => set((state) => ({ mode: typeof arg === "function" ? arg(state.mode) : arg })),
}));
