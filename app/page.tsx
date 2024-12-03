"use client";
import { PomoTimer } from "@/features";
import { useModeStore } from "@/features/pomo-timer/model/store";

export default function Home() {
  const { mode } = useModeStore();

  return (
    <div
      className={`h-full flex justify-center items-center transition-colors duration-500 ease-in-out 
        ${
          mode === "WORK"
            ? "bg-point_red-300 dark:bg-point_red-400"
            : mode === "BREAK"
            ? "bg-primary-400 dark:bg-secondary-500"
            : "bg-point_blue-400 dark:bg-point_blue-600"
        }
      `}
    >
      <PomoTimer />
    </div>
  );
}
