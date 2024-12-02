"use client";
import { useDrawerStore } from "./store";

export const Drawer = () => {
  const { show, content, close } = useDrawerStore();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-500 easy-in-out z-40
            ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => close()}
      ></div>
      <div
        className={`
          fixed top-0 right-0 w-96 h-full rounded-l-2xl p-6 bg-background-default transition-transform
          duration-500 easy-in-out z-50 dark:bg-background-light_dark
          ${show ? "translate-x-0" : "translate-x-full"}`}
      >
        {content}
      </div>
    </>
  );
};
