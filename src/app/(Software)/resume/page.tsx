import { auth } from "@/auth";
import ResumeComponent from "@/components/ResumeComponent";

import { redirect } from "next/navigation";
import React from "react";

const Resume =
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
        <ResumeComponent
          user_id={
            session
              ?.user
              ?.id
          }
        />
      );
  };

export default Resume;
