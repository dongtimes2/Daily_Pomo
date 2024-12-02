"use client";
import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../button/Button";

export const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button data-testid="theme-toggle" onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
};
