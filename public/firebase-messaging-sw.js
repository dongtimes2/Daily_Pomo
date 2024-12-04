"use strict";

importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAN1tT_pU6LDbsgSUF-LOu18K5uhM3VFZM",
  authDomain: "daily-pomo.firebaseapp.com",
  projectId: "daily-pomo",
  storageBucket: "daily-pomo.firebasestorage.app",
  messagingSenderId: "1081331981121",
  appId: "1:1081331981121:web:00f4709e5891c6d44f1fc0",
});

const isSupported = firebase.messaging.isSupported();

if (isSupported) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(payload);
    const {
      notification: { title },
    } = payload;

    self.registration.showNotification(title);
  });
}
