import Link from "next/link";

import { Flame } from "lucide-react";

import { ButtonList } from "./button-list/ButtonList";
import { ThemeToggle } from "./theme-toggle/ThemeToggle";

export const Header = () => {
  return (
    <header className="flex-shrink-0 w-full h-14 bg-background-light dark:bg-background-dark">
      <div className="h-full flex justify-between items-center mx-auto max-w-5xl px-6">
        <Link href="/">
          <span className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Daily Pomo</h1>
            <Flame color="#fd2b78" />
          </span>
        </Link>
        <span className="flex items-center gap-4">
          <ButtonList />
          <ThemeToggle />
        </span>
      </div>
    </header>
  );
};
