import { create } from "zustand";

import {
  DEFAULT_BREAK_TIME,
  DEFAULT_LONG_BREAK_INTERVAL,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_WORK_TIME,
} from "./constants";
import { TMode } from "./types";

interface ISettingsState {
  workTime: number;
  breakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
  actions: {
    setSettings: (settings: {
      workTime: number;
      breakTime: number;
      longBreakTime: number;
      longBreakInterval: number;
    }) => void;
    getTime: (mode: TMode) => number;
  };
}

export const useSettingsStore = create<ISettingsState>()((set, get) => ({
  workTime: DEFAULT_WORK_TIME,
  breakTime: DEFAULT_BREAK_TIME,
  longBreakTime: DEFAULT_LONG_BREAK_TIME,
  longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
  actions: {
    setSettings: (settings) => set(settings),
    getTime: (mode: TMode) => {
      const state = get();
      switch (mode) {
        case "WORK":
          return state.workTime * 60;
        case "BREAK":
          return state.breakTime * 60;
        case "LONG_BREAK":
          return state.longBreakTime * 60;
      }
    },
  },
}));
