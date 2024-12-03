import { IWorkerMessage } from "../model/types";

let timerInterval: NodeJS.Timeout | null = null;

self.onmessage = (e: MessageEvent<IWorkerMessage>) => {
  const { type, dueTime, baseTime } = e.data;

  switch (type) {
    case "START":
      if (!baseTime || !dueTime) return;
      timerInterval = setInterval(() => {
        const remaining = Math.round((Date.now() - baseTime) / 1000);
        if (dueTime - remaining <= 0) {
          self.postMessage({ type: "COMPLETE" });
          clearInterval(timerInterval as NodeJS.Timeout);
        } else {
          self.postMessage({ type: "TICK", timeLeft: dueTime - remaining });
        }
      }, 1000);
      break;

    case "RESET":
    case "STOP":
      clearInterval(timerInterval as NodeJS.Timeout);
      timerInterval = null;
      break;
  }
};
