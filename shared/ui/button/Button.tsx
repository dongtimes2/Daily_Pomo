"use client";
import { ButtonHTMLAttributes, MouseEvent, useState } from "react";

import { BeatLoader } from "react-spinners";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
}

export const Button = ({ children, onClick, disabled, ...props }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;

    const result = onClick(e);

    if (result instanceof Promise) {
      setIsLoading(true);

      result.finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <button {...props} onClick={handleClick} disabled={disabled || isLoading}>
      {isLoading ? <BeatLoader data-testid="button-spinner" color="#ffffff" size={8} /> : children}
    </button>
  );
};
