import { ButtonHTMLAttributes, useState } from "react";

import { BaseButton } from "@/shared/ui/base-button";

import pressSound from "../../../../public/press_sound.mp3";
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPressed?: boolean;
}

export const Button = ({ children, isPressed = false, ...props }: IButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <BaseButton
      className={`
        flex justify-center items-center w-12 h-12 rounded-lg bg-transparent border-2 border-point_gray-500 dark:border-white
        ${
          isPressed || isClicked
            ? "translate-y-[4px]"
            : "shadow-[0_4px_0_0_rgb(120,120,120)] dark:shadow-[0_4px_0_0_rgb(200,200,200)]"
        }
      `}
      type="button"
      onMouseDown={() => {
        new Audio(pressSound).play();
        setIsClicked(true);
      }}
      onMouseUp={() => setIsClicked(false)}
      {...props}
    >
      {children}
    </BaseButton>
  );
};
