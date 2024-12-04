"use client";
import { useEffect } from "react";

import { initFirebaseApp } from "@/shared/lib/worker";

export const ServiceWorkerRegistration = () => {
  useEffect(() => {
    const init = async () => {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          initFirebaseApp();
        } catch (err) {
          console.error(err);
        }
      }
    };

    init();
  }, []);

  return null;
};
