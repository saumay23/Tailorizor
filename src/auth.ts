// @ts-ignore
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} =
  NextAuth(
    {
      ...authConfig,
      adapter:
        MongoDBAdapter(
          client
        ),
      secret:
        process
          .env
          .NEXTAUTH_SECRET,

      session:
        {
          strategy:
            "jwt",
        },
      pages:
        {
          signIn:
            "/auth/login",
          error:
            "/auth/login?error=acessDenied",
        },
      callbacks:
        {
          async jwt({
            token,
            user,
          }) {
            if (
              user
            ) {
              token.accessToken =
                //@ts-ignore
                user.access_token;

              token.id =
                user.id;
            }

            return token;
          },

          async session({
            session,
            token,
          }) {
            //@ts-ignore
            session.accessToken =
              token.accessToken;
            //@ts-ignore
            session.user.id =
              token.id;

            return session;
          },
        },
    }
  );
