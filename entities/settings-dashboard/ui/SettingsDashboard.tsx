import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDrawerStore } from "@/shared/lib/drawer/store";
import { BaseButton } from "@/shared/ui/base-button";

import { useSettingsStore } from "../model/store";

const settingsSchema = z.object({
  workTime: z
    .number()
    .min(1, "Work time must be at least 1 minute")
    .max(999, "Work time must be less than 999 minutes")
    .int("Work time must be a whole number"),
  breakTime: z
    .number()
    .min(1, "Break time must be at least 1 minute")
    .max(999, "Break time must be less than 999 minutes")
    .int("Break time must be a whole number"),
  longBreakTime: z
    .number()
    .min(1, "Long break time must be at least 1 minute")
    .max(999, "Long break time must be less than 999 minutes")
    .int("Long break time must be a whole number"),
  longBreakInterval: z
    .number()
    .min(1, "Interval must be at least 1")
    .max(10, "Interval must be less than 10")
    .int("Interval must be a whole number"),
});

type TSettingsForm = z.infer<typeof settingsSchema>;

export const SettingsDashboard = () => {
  const { close } = useDrawerStore();
  const { breakTime, longBreakInterval, longBreakTime, workTime } = useSettingsStore();
  const { setSettings } = useSettingsStore((state) => state.actions);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<TSettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      workTime,
      breakTime,
      longBreakTime,
      longBreakInterval,
    },
  });

  const onSubmit = (data: TSettingsForm) => {
    setSettings(data);
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-2xl text-center font-bold mb-3">Settings</h3>
      <hr />
      <div className="my-3">
        <div className="flex flex-col gap-6">
          <h4 className="text-xl font-semibold">Time Settings (min)</h4>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-24">
              <label className="text-md" htmlFor="work-time">
                Work
              </label>
              <input
                className="p-2 rounded-md focus:outline-none"
                type="number"
                id="work-time"
                min={1}
                step={1}
                {...register("workTime", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col gap-1 w-24">
              <label className="text-md" htmlFor="break-time">
                Break
              </label>
              <input
                className="p-2 rounded-md focus:outline-none"
                type="number"
                id="break-time"
                min={1}
                step={1}
                {...register("breakTime", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col gap-1 w-24">
              <label className="text-md" htmlFor="long-break-time">
                Long Break
              </label>
              <input
                className="p-2 rounded-md focus:outline-none"
                type="number"
                id="long-break-time"
                min={1}
                step={1}
                {...register("longBreakTime", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-lg" htmlFor="long-break-interval">
              Long Break Interval
            </label>
            <input
              className="w-28 p-2 rounded-md focus:outline-none"
              type="number"
              id="long-break-interval"
              min={1}
              step={1}
              {...register("longBreakInterval", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <BaseButton
          type="submit"
          className={`
            w-full h-12 rounded-md bg-primary-600 text-white text-xl font-semibold 
            ${isValid ? "" : "opacity-40 cursor-not-allowed"}`}
        >
          SAVE
        </BaseButton>
      </div>
      <div className="w-full">
        {Object.values(errors).length > 0 &&
          Object.values(errors)
            .slice(0, 1)
            .map((error) => (
              <p className="text-point_red-450 dark:text-red-400" key={error.message}>
                {error.message}
              </p>
            ))}
      </div>
    </form>
  );
};
