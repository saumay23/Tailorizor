import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GettingStarted from "@/components/gettingStarted/gettingStarted";
import { connectToDatabase } from "@/lib/db";

const GettingStartedPage =
  async () => {
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
        const profile =
          await db
            .collection(
              "Profile"
            )
            .findOne(
              {
                user_id:
                  userId,
              }
            );

        if (
          profile
        ) {
          redirectURL =
            "/profile";
        }
      } catch (error) {
        console.log(
          error
        );
        redirectURL =
          "/error";
      } finally {
        if (
          redirectURL !==
          ""
        )
          redirect(
            redirectURL
          );
      }
      return (
        <GettingStarted
          userId={
            session
              ?.user
              ?.id as string
          }
        />
      );
    }
  };

export default GettingStartedPage;
