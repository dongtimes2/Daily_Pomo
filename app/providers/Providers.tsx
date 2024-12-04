import { PropsWithChildren } from "react";

import { NotiProvider } from "./NotiProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <NotiProvider>
        <ToastProvider>{children}</ToastProvider>
      </NotiProvider>
    </ThemeProvider>
  );
};
