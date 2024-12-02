import { ButtonHTMLAttributes } from "react";

import { BaseButton } from "@/shared/ui/base-button";

export const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <BaseButton className="flex items-center gap-1 h-8" type="button" {...props}>
      {children}
    </BaseButton>
  );
};
