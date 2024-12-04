"use client";
import { Settings2 } from "lucide-react";

import { SettingsDashboard } from "@/entities";
import { useDrawerStore } from "@/shared/lib/drawer/store";

import { Button } from "../button/Button";

export const ButtonList = () => {
  const { open } = useDrawerStore();

  return (
    <>
      <Button onClick={() => open(<SettingsDashboard />)}>
        <Settings2 />
        <p>Settings</p>
      </Button>
    </>
  );
};
