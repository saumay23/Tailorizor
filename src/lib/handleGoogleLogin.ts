"use server";

import { signIn } from "@/auth";

export const HandleGoogleLogin =
  async () => {
    await signIn(
      "google",
      {
        redirectTo:
          "/dashboard",
      }
    );
  };
