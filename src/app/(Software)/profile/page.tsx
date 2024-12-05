import { auth } from "@/auth";
import ProfileForm from "@/components/profile/ProfileForm";
import { connectToDatabase } from "@/lib/db";
import { ProfileType } from "@/lib/types/profile";
import { redirect } from "next/navigation";
import React from "react";

const Profile =
  async () => {
    let profileProp: ProfileType | null =
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
        const profile =
          await db
            .collection<ProfileType>(
              "Profile"
            )
            .findOne(
              {
                user_id:
                  userId,
              }
            );

        if (
          !profile
        ) {
          redirectURL =
            "/gettingStarted";
        }
        if (
          profile
        ) {
          const {
            _id /* eslint-disable @typescript-eslint/no-unused-vars */,

            ...rest
          } =
            profile;
          profileProp =
            rest;
        }
      } catch (error) {
        redirectURL =
          "/error";
        profileProp =
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
        {profileProp ? (
          <div className="min-w-screen  h-[calc(100vh_-_5rem)]  scrollbar-none">
            <ProfileForm
              profile={
                profileProp
              }
            />
          </div>
        ) : (
          <p>
            Failed
            to
            load
            data.
          </p>
        )}
      </>
    );
  };

export default Profile;
