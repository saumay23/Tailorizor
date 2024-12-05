"use server";

import { signOut } from "@/auth";

export const HandleLogout =
  async () => {
    await signOut();
  };
