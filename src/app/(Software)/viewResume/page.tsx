import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { ResumeType } from "@/lib/types/resume";
import { redirect } from "next/navigation";
import Template1 from "@/components/ui/template/template1";
import { ObjectId } from "mongodb";

const ViewResume =
  async ({
    searchParams,
  }: {
    searchParams: Promise<{
      [
        key: string
      ]:
        | string
        | string[]
        | undefined;
    }>;
  }) => {
    let resumeProp: ResumeType | null =
      null;
    let redirectURL =
      "";

    // Authenticate the user
    const session =
      await auth();

    // If no session, redirect to login page
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
        const resumeId =
          (
            await searchParams
          )
            .id as string;
        if (
          !userId ||
          !resumeId
        ) {
          throw new Error(
            "User ID is missing from the session or id is Missing"
          );
        }

        // Connect to the database and fetch the resume
        const db =
          await connectToDatabase();
        const resume =
          await db
            .collection<ResumeType>(
              "Resume"
            )
            .findOne(
              {
                _id: new ObjectId(
                  resumeId
                ),
              }
            );

        if (
          !resume
        ) {
          redirectURL =
            "/dashboard";
        }

        resumeProp =
          resume;
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
        ) {
          redirect(
            redirectURL
          );
        }
      }
    }

    return (
      <>
        {resumeProp ? (
          <div className="min-w-screen flex justify-center h-[calc(100vh_-_5rem)] p-10 mb-10 overflow-scroll">
            <Template1
              data={
                resumeProp
              }
            />
          </div>
        ) : null}
      </>
    );
  };

export default ViewResume;
