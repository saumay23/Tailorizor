import mongoose from "mongoose";

export const ResumeSchema =
  new mongoose.Schema(
    {
      user_id:
        {
          type: String,
          required:
            true,
        },
      resumeName:
        {
          type: String,
          required:
            true,
          unique:
            true,
        },
      personalDetails:
        {
          name: {
            type: String,
            required:
              true,
          },
          email:
            {
              type: String,
              required:
                true,
            },
          contact_no:
            String,
          country:
            String,
          city: String,
        },
      roleDetails:
        {
          role: {
            type: String,
            required:
              true,
          },
          linkedIn:
            {
              type: String,
              required:
                true,
            },
          summary:
            String,
        },
      Education:
        {
          data: [
            {
              Institute:
                {
                  type: String,
                  required:
                    true,
                },
              degree:
                {
                  type: String,
                  required:
                    true,
                },
              start_date:
                Date,
              end_date:
                Date,
              location:
                {
                  type: String,
                  required:
                    true,
                },
              description:
                String,
            },
          ],
          fieldName:
            String,
        },
      WorkExperience:
        {
          data: [
            {
              company_name:
                {
                  type: String,
                  required:
                    true,
                },
              start_date:
                Date,
              end_date:
                Date,
              role: {
                type: String,
                required:
                  true,
              },
              description:
                String,
              location:
                {
                  type: String,
                  required:
                    true,
                },
            },
          ],
          fieldName:
            String,
        },
      Skills:
        {
          fieldName:
            String,
          data: {
            type: String,
            required:
              true,
          },
        },
      CustomField:
        [
          {
            fieldName:
              String,
            fields:
              [
                {
                  header:
                    String,
                  subHeader:
                    String,
                  description:
                    String,
                },
              ],
          },
        ],
    },
    {
      timestamps:
        true,
    }
  );

const Resume =
  mongoose
    .models
    ?.Resume ||
  mongoose.model(
    "Resume",
    ResumeSchema
  );
export default Resume;