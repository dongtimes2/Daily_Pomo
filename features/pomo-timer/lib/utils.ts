import { TMode } from "@/entities";

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const getNextMode = (mode: TMode) => {
  switch (mode) {
    case "WORK":
      return "BREAK";
    case "BREAK":
      return "LONG_BREAK";
    case "LONG_BREAK":
      return "WORK";
  }
};

export const getModeTitle = (mode: TMode) => {
  switch (mode) {
    case "WORK":
      return "Work Time";
    case "BREAK":
      return "Break Time";
    case "LONG_BREAK":
      return "Long Break Time";
  }
};

export const getMessage = (mode: TMode) => {
  switch (mode) {
    case "WORK":
      return "Time to focus and achieve!";
    case "BREAK":
      return "Quick refresh, you earned it!";
    case "LONG_BREAK":
      return "Recharge fully - you're doing great!";
  }
};
