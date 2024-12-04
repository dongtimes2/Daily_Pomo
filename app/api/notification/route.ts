import { NextResponse } from "next/server";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const initializeFirebaseAdmin = () => {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: (process.env.PRIVATE_KEY as string).replace(/\\n/g, "\n"),
      }),
    });
  }
};

export const POST = async (req: Request) => {
  try {
    initializeFirebaseAdmin();
    const { title, token } = await req.json();

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "TITLE_IS_REQUIRED",
        },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "TOKEN_IS_REQUIRED",
        },
        { status: 400 }
      );
    }

    const message = {
      notification: {
        title,
      },
      token: token,
    };

    await getMessaging().send(message);
    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Requested entity was not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "TOKEN_EXPIRED",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
