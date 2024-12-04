import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

import { db } from "@/shared/model/db";

const firebaseConfig = {
  apiKey: "AIzaSyAN1tT_pU6LDbsgSUF-LOu18K5uhM3VFZM",
  authDomain: "daily-pomo.firebaseapp.com",
  projectId: "daily-pomo",
  storageBucket: "daily-pomo.firebasestorage.app",
  messagingSenderId: "1081331981121",
  appId: "1:1081331981121:web:00f4709e5891c6d44f1fc0",
};

const vapidKey = "BGG6YZF6d8r3w8PaEH__04TpgdmyNH8zr7XHHynkFKTm7jFLLYy-2GoXNCVuBQL7y45gx1SopU3dgSJ6IHqEVSg";

export const initFirebaseApp = () => {
  const apps = getApps();

  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    getMessaging(app);
  }
};

export const validateToken = async (token: string, messaging: Messaging) => {
  try {
    const currentToekn = await getToken(messaging, { vapidKey });
    return currentToekn === token;
  } catch {
    return false;
  }
};

export const deriveFcmToken = async (messaging: Messaging) => {
  try {
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      await db.token.add({ token });
      return token;
    }
  } catch (err) {
    throw err;
  }
};

export const getFcmToken = async () => {
  initFirebaseApp();
  const messaging = getMessaging();
  const storedToken = await db.token.toArray();

  if (window && !("Notification" in window)) {
    return;
  }

  if (storedToken.length > 0) {
    return storedToken[0].token;
  }

  if (Notification.permission === "granted") {
    try {
      const derivedFcmToken = await deriveFcmToken(messaging);
      return derivedFcmToken;
    } catch (err) {
      throw err;
    }
  }

  if (Notification.permission === "denied" || Notification.permission === "default") {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const derivedFcmToken = await deriveFcmToken(messaging);
          return derivedFcmToken;
        } catch (err) {
          throw err;
        }
      } else if (permission === "denied") {
        return;
      }
    } catch (err) {
      throw err;
    }
  }
};
