import { connectToDatabase } from "@/lib/db";
import { ProfileType } from "@/lib/types/profile";
import {
  NextRequest,
  NextResponse,
} from "next/server";

// Utility function to connect to MongoDB

// POST handler to insert or update a profile
export async function POST(
  req: NextRequest
) {
  try {
    const db =
      await connectToDatabase();
    const data: ProfileType =
      await req.json();
    const user_id =
      data.user_id as string;

    const result =
      await db
        .collection(
          "Profile"
        )
        .replaceOne(
          {
            user_id,
          }, // Filter to find the document
          {
            ...data,
          }, // Replace with new data
          {
            upsert:
              true,
          } // Insert if no document exists
        );
    const result2 =
      await db
        .collection(
          "Resume"
        )
        .replaceOne(
          {
            user_id:
              user_id,
            resumeName:
              "Default",
          },
          {
            resumeName:
              "Default",
            ...data,
          },
          {
            upsert:
              true,
          } // Insert if no document exists
        );
    return NextResponse.json(
      {
        message:
          "Successfully inserted/Updated",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Error in POST handler:",
      error
    );
    return NextResponse.json(
      {
        error:
          "Failed to insert/update the profile",
      },
      {
        status: 500,
      }
    );
  }
}
