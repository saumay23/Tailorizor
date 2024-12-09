import { connectToDatabase } from "@/lib/db";
import { ProfileType } from "@/lib/types/profile";

import {
  NextRequest,
  NextResponse,
} from "next/server";
import Together from "together-ai";

export async function POST(
  req: NextRequest
) {
  try {
    const db =
      await connectToDatabase();
    const data: {
      user_id: string;
      jobDescription: string;
    } =
      await req.json();
    const user_id =
      data.user_id as string;

    // Fetch the user's resume from the database
    const resume =
      await db
        .collection<ProfileType>(
          "Profile"
        )
        .findOne(
          {
            user_id:
              user_id,
          }
        );

    if (
      !resume
    ) {
      throw new Error(
        "No resume found"
      );
    }

    // Initialize Together AI client
    try {
      const together =
        new Together(
          {
            apiKey:
              process
                .env
                .TOGETHER_API_KEY,
          }
        );

      const prompt = `
        You are an AI assistant specializing in tailoring resumes for job applications.
        
        **Objective:**  
        1. Extract essential skills, qualifications, and relevant keywords from the provided job description.  
        2. Edit only the descriptions in the provided resume JSON to incorporate these keywords while preserving the structure and format.  
        3. Do not create or remove any "WorkExperience," "Education," "Skills," or "CustomField" sections. Modify only the descriptions within the existing entries.  
        4. Do not modify the LinkedIn URL field or any other non-description fields.
        
        **Instructions:**  
        - Update the descriptions in "WorkExperience," "Education," "Skills," and "CustomField" to reflect the requirements and priorities outlined in the job description more effectively.  
        - Avoid adding unrelated information—focus on refining the descriptions to align with the job description.  
        - Retain the provided JSON schema and ensure the output is a valid JSON object. Return **only** the modified resume object with updated descriptions, incorporating the relevant keywords from the job description. The returned object should match the same format as the original resume with updated descriptions only.
        
        **Input:**  
        - **Job Description:**  
          ${
            data.jobDescription
          }  
        
        - **Resume JSON:**  
          ${JSON.stringify(
            resume
          )}  
        
        **Output:**  
        Return the same object format as the original resume, with updated descriptions incorporating keywords from the job description, and return **only** the updated object (no additional explanations).
        `;

      const modifiedResume =
        await together.chat.completions.create(
          {
            model:
              "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            temperature: 1,

            messages:
              [
                {
                  role: "user",
                  content:
                    prompt,
                },
              ],
          }
        );
      if (
        modifiedResume
          ?.choices[0]
          ?.message
          ?.content
      )
        // Return the modified resume
        return NextResponse.json(
          modifiedResume
            ?.choices?.[0]
            ?.message
            ?.content,
          {
            status: 200,
          }
        );
    } catch (openaiError) {
      console.error(
        "AI error:",
        openaiError
      );
      return NextResponse.json(
        {
          error:
            "Failed to communicate with AI service",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(
      "Error in handler:",
      error
    );
    return NextResponse.json(
      {
        error:
          "Failed to generate resume details",
      },
      {
        status: 500,
      }
    );
  }
}
