import { InferType } from "yup";
import * as yup from "yup";

export const ResumeSchema =
  yup.object(
    {
      user_id:
        yup
          .string()
          .nonNullable(),
      resumeName:
        yup
          .string()
          .nonNullable(),
      personalDetails:
        yup.object(
          {
            name: yup
              .string()
              .required(
                "name is required"
              ),
            email:
              yup
                .string()
                .email(
                  "please enter a valid email"
                )
                .required(
                  "email is required"
                ),
            contact_no:
              yup
                .string()
                .optional(),
            country:
              yup
                .string()
                .optional(),
            city: yup
              .string()
              .optional(),
          }
        ),
      roleDetails:
        yup.object(
          {
            role: yup
              .string()
              .required(
                "Role is required"
              ),
            linkedIn:
              yup
                .string()
                .matches(
                  /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                  "Invalid LinkedIn URL"
                )
                .required(
                  "LinkedIn is required"
                ),
            summary:
              yup
                .string()
                .optional(),
          }
        ),
      Education:
        yup.object(
          {
            data: yup
              .array(
                yup.object(
                  {
                    Institute:
                      yup
                        .string()
                        .required(
                          "Institute is required"
                        ),
                    degree:
                      yup
                        .string()
                        .required(
                          "Degree is required"
                        ),
                    start_date:
                      yup.date(),
                    end_date:
                      yup
                        .date()
                        .min(
                          yup.ref(
                            "start_date"
                          ),
                          "End date cannot be before start date"
                        ),
                    location:
                      yup
                        .string()
                        .required(
                          "Location is required"
                        ),
                    description:
                      yup
                        .string()
                        .optional(),
                  }
                )
              )
              .required(),
            fieldName:
              yup
                .string()
                .optional(),
          }
        ),
      WorkExperience:
        yup.object(
          {
            data: yup
              .array(
                yup.object(
                  {
                    company_name:
                      yup
                        .string()
                        .required(
                          "Company name is required"
                        ),
                    start_date:
                      yup.date(),
                    end_date:
                      yup
                        .date()
                        .min(
                          yup.ref(
                            "start_date"
                          ),
                          "End date cannot be before start date"
                        )
                        .optional(),
                    role: yup
                      .string()
                      .required(
                        "Role is required"
                      ),
                    description:
                      yup
                        .string()
                        .optional(),
                    location:
                      yup
                        .string()
                        .required(
                          "Location is required"
                        ),
                  }
                )
              )
              .required(),
            fieldName:
              yup
                .string()
                .optional(),
          }
        ),
      Skills:
        yup.object(
          {
            fieldName:
              yup
                .string()
                .optional(),
            data: yup.string(),
          }
        ),
      CustomField:
        yup
          .array(
            yup.object(
              {
                fieldName:
                  yup
                    .string()
                    .required(
                      "This cannot be empty"
                    ),
                fields:
                  yup.array(
                    yup.object(
                      {
                        header:
                          yup
                            .string()
                            .required(
                              "Header is required"
                            ),
                        subHeader:
                          yup.string(),
                        description:
                          yup.string(),
                      }
                    )
                  ),
              }
            )
          )
          .nullable(),
    }
  );

export type ResumeType =
  InferType<
    typeof ResumeSchema
  >;
