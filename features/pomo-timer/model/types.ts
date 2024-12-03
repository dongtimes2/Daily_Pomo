type TWorkerMessageType = "START" | "RESET" | "STOP" | "COMPLETE" | "TICK" | "DEBUG";

export interface IWorkerMessage {
  type: TWorkerMessageType;
  timeLeft?: number;
  dueTime?: number;
  baseTime?: number;
  message?: string;
}
