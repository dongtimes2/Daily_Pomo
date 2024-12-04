import { PropsWithChildren } from "react";

import { ToastContainer } from "react-toastify";

export const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
