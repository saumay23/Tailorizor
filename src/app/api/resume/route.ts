import { connectToDatabase } from "@/lib/db";
import { ResumeType } from "@/lib/types/resume";
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
    const data: ResumeType =
      await req.json();
    console.log(
      data
    );
    await db
      .collection(
        "Resume"
      )
      .insertOne(
        {
          ...data,
        }
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
          "Failed to insert the resume",
      },
      {
        status: 500,
      }
    );
  }
}
