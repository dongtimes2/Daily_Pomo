import { PropsWithChildren } from "react";

import { ThemeProvider as ThemeProviderLib } from "next-themes";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProviderLib attribute="class">{children}</ThemeProviderLib>;
};
