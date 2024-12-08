import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { ResumeType } from "@/lib/types/resume";
import { redirect } from "next/navigation";
import React from "react";
import DashBoardComponent from "@/components/DashBoardComponent";

const Dashboard =
  async () => {
    let resumeIds:
      | string[]
      | null =
      null;
    let resumeProp:
      | ResumeType[]
      | null =
      null;
    let redirectURL =
      "";
    const session =
      await auth();

    if (
      !session
    ) {
      redirect(
        "/auth/login"
      );
    } else {
      try {
        const userId =
          session
            ?.user
            ?.id;
        if (
          !userId
        ) {
          throw new Error(
            "User ID is missing from the session"
          );
        }

        const db =
          await connectToDatabase();
        const resume =
          await db
            .collection<ResumeType>(
              "Resume"
            )
            .find(
              {
                user_id:
                  userId,
              }
            )
            .toArray();

        if (
          resume?.length ===
          0
        ) {
          redirectURL =
            "/gettingStarted";
        }
        /* eslint-disable @typescript-eslint/no-unused-vars */

        resumeProp =
          resume?.map(
            ({
              _id,
              ...rest
            }) =>
              rest
          );
        resumeIds =
          resume?.map(
            ({
              _id,
              ...rest
            }) =>
              _id.toString()
          );
        /* eslint-enable @typescript-eslint/no-unused-vars */
      } catch (error) {
        console.log(
          error
        );
        redirectURL =
          "/error";
        resumeProp =
          null;
      } finally {
        if (
          redirectURL !==
          ""
        )
          redirect(
            redirectURL
          );
      }
    }

    return (
      <>
        {resumeProp &&
        resumeIds ? (
          <div className="min-w-screen  h-[calc(100vh_-_5rem)]  scrollbar-none">
            <DashBoardComponent
              resumeIDs={
                resumeIds
              }
              resumes={
                resumeProp
              }
            />
          </div>
        ) : null}
      </>
    );
  };

export default Dashboard;
