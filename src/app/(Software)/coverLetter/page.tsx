import { auth } from "@/auth";

import { redirect } from "next/navigation";
import React from "react";

const CoverLetter =
  async () => {
    const session =
      await auth();

    if (
      !session
    ) {
      redirect(
        "/auth/login"
      );
    }
    if (
      session
        ?.user
        ?.id
    )
      return (
        <>

        </>
      );
  };

export default CoverLetter;
