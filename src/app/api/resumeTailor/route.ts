import { connectToDatabase } from "@/lib/db";
import { ProfileType } from "@/lib/types/profile";
import {
  NextRequest,
  NextResponse,
} from "next/server";
import {
  GoogleGenerativeAI,
  SchemaType,
} from "@google/generative-ai";

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

    // Fetch the user's resume
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

    const {
      _id,
      ...rest
    } =
      resume;

    // Initialize OpenAI API client

    const genAI =
      new GoogleGenerativeAI(
        process
          .env
          .AI_KEY ||
          ""
      );
    const schema =
      {
        type: SchemaType.OBJECT,
        properties:
          {
            user_id:
              {
                type: SchemaType.STRING,
              },
            resumeName:
              {
                type: SchemaType.STRING,
              },
            personalDetails:
              {
                type: SchemaType.OBJECT,
                properties:
                  {
                    name: {
                      type: SchemaType.STRING,
                    },
                    email:
                      {
                        type: SchemaType.STRING,
                      },
                    contact_no:
                      {
                        type: SchemaType.STRING,
                      },
                    country:
                      {
                        type: SchemaType.STRING,
                      },
                    city: {
                      type: SchemaType.STRING,
                    },
                  },
                required:
                  [
                    "name",
                    "email",
                  ],
              },
            roleDetails:
              {
                type: SchemaType.OBJECT,
                properties:
                  {
                    role: {
                      type: SchemaType.STRING,
                    },
                    linkedIn:
                      {
                        type: SchemaType.STRING,
                      },
                    summary:
                      {
                        type: SchemaType.STRING,
                      },
                  },
                required:
                  [
                    "role",
                    "linkedIn",
                  ],
              },
            Education:
              {
                type: SchemaType.OBJECT,
                properties:
                  {
                    data: {
                      type: SchemaType.ARRAY,
                      items:
                        {
                          type: SchemaType.OBJECT,
                          properties:
                            {
                              Institute:
                                {
                                  type: SchemaType.STRING,
                                },
                              degree:
                                {
                                  type: SchemaType.STRING,
                                },
                              start_date:
                                {
                                  type: SchemaType.STRING,
                                },
                              end_date:
                                {
                                  type: SchemaType.STRING,
                                },
                              location:
                                {
                                  type: SchemaType.STRING,
                                },
                              description:
                                {
                                  type: SchemaType.STRING,
                                },
                            },
                          required:
                            [
                              "Institute",
                              "degree",
                              "location",
                              "description",
                            ],
                        },
                    },
                    fieldName:
                      {
                        type: SchemaType.STRING,
                      },
                  },
                required:
                  [
                    "data",
                  ],
              },
            WorkExperience:
              {
                type: SchemaType.OBJECT,
                properties:
                  {
                    data: {
                      type: SchemaType.ARRAY,
                      items:
                        {
                          type: SchemaType.OBJECT,
                          properties:
                            {
                              company_name:
                                {
                                  type: SchemaType.STRING,
                                },
                              start_date:
                                {
                                  type: SchemaType.STRING,
                                },
                              end_date:
                                {
                                  type: SchemaType.STRING,
                                },
                              role: {
                                type: SchemaType.STRING,
                              },
                              description:
                                {
                                  type: SchemaType.STRING,
                                },
                              location:
                                {
                                  type: SchemaType.STRING,
                                },
                            },
                          required:
                            [
                              "company_name",
                              "role",
                              "location",
                              "description",
                            ],
                        },
                    },
                    fieldName:
                      {
                        type: SchemaType.STRING,
                      },
                  },
                required:
                  [
                    "data",
                  ],
              },
            Skills:
              {
                type: SchemaType.OBJECT,
                properties:
                  {
                    fieldName:
                      {
                        type: SchemaType.STRING,
                      },
                    data: {
                      type: SchemaType.STRING,
                    },
                  },
                required:
                  [
                    "data",
                  ],
              },
            CustomField:
              {
                type: SchemaType.ARRAY,
                items:
                  {
                    type: SchemaType.OBJECT,
                    properties:
                      {
                        fieldName:
                          {
                            type: SchemaType.STRING,
                          },
                        fields:
                          {
                            type: SchemaType.ARRAY,
                            items:
                              {
                                type: SchemaType.OBJECT,
                                properties:
                                  {
                                    header:
                                      {
                                        type: SchemaType.STRING,
                                      },
                                    subHeader:
                                      {
                                        type: SchemaType.STRING,
                                      },
                                    description:
                                      {
                                        type: SchemaType.STRING,
                                      },
                                  },
                              },
                          },
                      },
                  },
              },
          },
        required:
          [
            "user_id",
            "resumeName",
            "Education",
            "WorkExperience",
            "Skills",
            "CustomField",
          ],
      };
    try {
      const model =
        genAI.getGenerativeModel(
          {
            model:
              "gemini-1.5-pro",
          }
        );
      const generationConfig =
        {
          temperature: 1,
          responseMimeType:
            "application/json",
          responseSchema:
            schema,
        };
      const prompt = `
      You are an AI assistant tasked with tailoring resumes for job applications. 
      **Objective:**
      1. Extract key skills, qualifications, and relevant keywords from the provided job description.
      2. Incorporate these keywords into the given resume JSON while maintaining its structure and format.
      3. Modify specific sections like "Education," "WorkExperience," "Skills," and "CustomField" to align with the job description's requirements.
      
      **Instructions:**
      - Update the "resumeName" field to include the company or role name if mentioned in the job description.
      - Ensure the "WorkExperience" and "Education" descriptions reflect the job description’s priorities.
      - Do not introduce extraneous information; only refine or rephrase the existing content to better match the job description.
      - Preserve the JSON schema provided below and return a complete JSON object with the modified resume.
      
      **Job Description:** 
      ${
        data.jobDescription
      }
      
      **Resume JSON:** 
      ${JSON.stringify(
        resume
      )}
      
      **Expected Output:**
      Return the modified resume as a JSON object adhering to the schema, with all updates seamlessly integrated.
        `;

      const chatSession =
        model.startChat(
          {
            generationConfig,
            history:
              [],
          }
        );

      const modifiedResume =
        await chatSession.sendMessage(
          prompt
        );

      if (
        !modifiedResume
      ) {
        throw new Error(
          "Failed to generate modified resume"
        );
      }

      // Parse the modified resume into an object (assuming it's in JSON format)

      // Validate the parsed resume using the ResumeSchema (yup)

      // Return the validated resume
      return NextResponse.json(
        {
          message:
            "Resume modified and validated successfully",
          modifiedResume:
            modifiedResume.response.text(),
        },
        {
          status: 200,
        }
      );
    } catch (openaiError) {
      console.error(
        "Gemini error:",
        openaiError
      );
      return NextResponse.json(
        {
          error:
            "Failed to communicate with Gemini",
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
          "Failed to generate details",
      },
      {
        status: 500,
      }
    );
  }
}
