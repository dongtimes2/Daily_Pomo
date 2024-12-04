import { useEffect, useRef, useState } from "react";

import { Play, Pause, RotateCcw, Coffee, Flame, BatteryCharging } from "lucide-react";

import { useSettingsStore } from "@/entities";
import { getFcmToken } from "@/shared/lib/worker/firebase";

import { Button } from "./button/Button";

import { postSendMessage } from "../api/api";
import { formatTime, getModeTitle, getNextMode } from "../lib/utils";
import { useModeStore } from "../model/store";
import { IWorkerMessage } from "../model/types";

export const PomoTimer = () => {
  const { mode, setMode } = useModeStore();
  const { longBreakInterval } = useSettingsStore();
  const { getTime } = useSettingsStore((state) => state.actions);
  const [time, setTime] = useState(getTime("WORK"));
  const [isActive, setIsActive] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const pomoCounter = useRef(0);

  const handleActiveToggle = () => {
    if (isActive) {
      workerRef.current?.postMessage({
        type: "STOP",
      });
    } else {
      workerRef.current?.postMessage({
        type: "START",
        dueTime: time,
        baseTime: Date.now(),
      });
    }

    setIsActive((prev) => !prev);
  };

  const handleModeToggle = () => {
    workerRef.current?.postMessage({
      type: "RESET",
    });
    setIsActive(false);
    setMode((prev) => getNextMode(prev));
    setTime(getTime(getNextMode(mode)));
  };

  const handleReset = () => {
    workerRef.current?.postMessage({
      type: "RESET",
    });
    setIsActive(false);
    setTime(getTime(mode));
  };

  useEffect(() => {
    workerRef.current = new Worker(new URL("../worker/time-worker.ts", import.meta.url));
  }, []);

  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.onmessage = async (e: MessageEvent<IWorkerMessage>) => {
      const { type, timeLeft } = e.data;

      switch (type) {
        case "TICK":
          if (timeLeft) {
            setTime(timeLeft);
          }
          break;

        case "COMPLETE":
          setIsActive(false);
          let token: string | undefined;

          try {
            token = await getFcmToken();
          } catch (err) {
            console.error(err);
          }

          try {
            if (mode === "WORK") {
              pomoCounter.current += 1;

              if (pomoCounter.current % longBreakInterval === 0) {
                setMode("LONG_BREAK");
                setTime(getTime("LONG_BREAK"));
                if (token) await postSendMessage({ mode: "LONG_BREAK", token });
              } else {
                setMode("BREAK");
                setTime(getTime("BREAK"));
                if (token) await postSendMessage({ mode: "BREAK", token });
              }
            } else {
              setMode("WORK");
              setTime(getTime("WORK"));
              if (token) await postSendMessage({ mode: "WORK", token });
            }
          } catch (err) {
            console.error(err);
          }
          break;
      }
    };
  }, [mode, setMode, getTime, longBreakInterval]);

  return (
    <div
      className={`
        flex-grow max-w-[480px] rounded-3xl bg-background-light bg-opacity-60
        space-y-6 py-6 dark:bg-background-default dark:bg-opacity-20`}
    >
      <div className="text-center">
        <h2 className="text-3xl text-point_gray-500 dark:text-white">{getModeTitle(mode)}</h2>
      </div>
      <div className="text-8xl font-semibold text-center font-mono text-point_gray-500 dark:text-white">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={handleActiveToggle} isPressed={isActive}>
          {isActive ? (
            <Pause className="w-5 h-5 text-point_gray-500 dark:text-white" />
          ) : (
            <Play className="w-5 h-5 text-point_gray-500 dark:text-white" />
          )}
        </Button>
        <Button onClick={handleReset}>
          <RotateCcw className="w-5 h-5 text-point_gray-500 dark:text-white" />
        </Button>
        <Button onClick={handleModeToggle}>
          {mode === "WORK" ? (
            <Coffee className="w-5 h-5 text-point_gray-500 dark:text-white" />
          ) : mode === "BREAK" ? (
            <BatteryCharging className="w-5 h-5 text-point_gray-500 dark:text-white" />
          ) : (
            <Flame className="w-5 h-5 text-point_gray-500 dark:text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};
