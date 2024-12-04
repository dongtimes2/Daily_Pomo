"use client";
import { PropsWithChildren, useEffect } from "react";

import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

import { getFcmToken } from "@/shared/lib/worker/firebase";

export const NotiProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const init = async () => {
      const token = await getFcmToken();
      if (!token) return;

      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        if (payload.notification) {
          const { title } = payload.notification;

          navigator.serviceWorker.ready.then(() => {
            toast.info(title);
          });
        }
      });
    };

    init();
  }, []);

  return <>{children}</>;
};
