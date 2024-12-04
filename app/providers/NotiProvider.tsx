"use client";
import { PropsWithChildren, useEffect } from "react";

import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

import { initFirebaseApp } from "@/shared/lib/worker";
import { getFcmToken } from "@/shared/lib/worker/firebase";

export const NotiProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const init = async () => {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          initFirebaseApp();

          const token = await getFcmToken();
          if (!token) return;
        } catch (err) {
          console.error(err);
        }
      }

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
