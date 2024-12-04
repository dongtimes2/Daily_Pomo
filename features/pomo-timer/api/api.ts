import { TMode } from "@/entities";
import { getFcmToken } from "@/shared/lib/worker/firebase";
import { db } from "@/shared/model/db";

import { getMessage } from "../lib/utils";

interface IPostSendMessagePayload {
  mode: TMode;
  token: string;
}

export const postSendMessage = async (payload: IPostSendMessagePayload) => {
  try {
    const response = await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: getMessage(payload.mode),
        token: payload.token,
      }),
    });

    const data = await response.json();
    if (!data.success && data.error === "TOKEN_EXPIRED") {
      await db.token.clear();
      const newToken = await getFcmToken();

      if (newToken) {
        postSendMessage({
          ...payload,
          token: newToken,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};
