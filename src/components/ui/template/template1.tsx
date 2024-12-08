import { ResumeType } from "@/lib/types/resume";
import React from "react";

const Template1 =
  ({
    data,
  }: {
    data: ResumeType;
  }) => {
    const formatDate =
      (
        date:
          | Date
          | undefined
      ) =>
        date
          ? new Date(
              date
            ).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month:
                  "short",
              }
            )
          : null;

    const {
      personalDetails,
      Education,
      WorkExperience,
      roleDetails,
      Skills,
      CustomField,
    } =
      data ||
      {};

    const personalInfo =
      [
        personalDetails?.contact_no,
        personalDetails?.email,
        personalDetails?.city,
        personalDetails?.country,
        roleDetails?.linkedIn,
      ].filter(
        Boolean
      );

    return (
      <div
        style={{
          width:
            "8.27in",
          display:
            "flex",
          flexDirection:
            "column",
          padding:
            "10px",
          fontFamily:
            '"Times New Roman", Times, serif',
        }}
      >
        <p
          style={{
            textAlign:
              "center",
            fontSize:
              "20px",
            textTransform:
              "uppercase",
            fontWeight:
              "bold",
          }}
        >
          {
            personalDetails?.name
          }
        </p>
        <div
          style={{
            lineHeight:
              "1.2",
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            fontSize:
              "11px",
          }}
        >
          {personalInfo.length >
            0 && (
            <span>
              {personalInfo.join(
                " | "
              )}
            </span>
          )}
        </div>
        {roleDetails?.summary &&
          roleDetails?.summary
            .replace(
              /(<([^>]+)>)/gi,
              ""
            )
            .trim() !==
            "" && (
            <div
              style={{
                display:
                  "flex",
                flexDirection:
                  "column",
                fontSize:
                  "11px",
                marginTop:
                  "0.5rem",
              }}
            >
              <p
                style={{
                  fontWeight:
                    "bold",
                  textTransform:
                    "uppercase",
                  borderBottom:
                    "1px solid black",
                }}
              >
                Summary
              </p>
              <div
                style={{
                  maxWidth:
                    "100%",
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    roleDetails?.summary,
                }}
              />
            </div>
          )}

        {Education
          ?.data
          ?.length >
          0 && (
          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              marginTop:
                "0.5rem",
            }}
          >
            <p
              style={{
                fontSize:
                  "11px",
                fontWeight:
                  "bold",
                textTransform:
                  "uppercase",
                borderBottom:
                  "1px solid black",
                marginBottom:
                  "0.625rem",
              }}
            >
              {Education?.fieldName ||
                "Education"}
            </p>
            {Education?.data?.map(
              (
                education,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    display:
                      "flex",
                    paddingLeft:
                      "1.25rem",
                    flexDirection:
                      "column",
                    fontSize:
                      "11px",
                    lineHeight:
                      "1.2",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                    }}
                  >
                    <span>
                      <span
                        style={{
                          fontWeight:
                            "bold",
                        }}
                      >
                        {
                          education?.Institute
                        }
                      </span>
                      ,&nbsp;
                      <span>
                        {
                          education?.location
                        }
                      </span>
                    </span>
                    <span
                      style={{
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {formatDate(
                        education?.start_date
                      )}{" "}
                      -{" "}
                      {education?.end_date
                        ? formatDate(
                            education?.end_date
                          )
                        : "Present"}
                    </span>
                  </div>
                  <div>
                    {
                      education?.degree
                    }
                  </div>
                  {education?.description && (
                    <div
                      style={{
                        maxWidth:
                          "100%",
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          education.description,
                      }}
                    />
                  )}
                  {index +
                    1 !==
                    Education
                      ?.data
                      ?.length && (
                    <br />
                  )}
                </div>
              )
            )}
          </div>
        )}
        {WorkExperience
          ?.data
          ?.length >
          0 && (
          <div
            style={{
              display:
                "flex",
              flexDirection:
                "column",
              marginTop:
                "0.5rem",
            }}
          >
            <p
              style={{
                fontSize:
                  "11px",
                fontWeight:
                  "bold",
                textTransform:
                  "uppercase",
                borderBottom:
                  "1px solid black",
                marginBottom:
                  "0.625rem",
              }}
            >
              {WorkExperience?.fieldName ||
                "Work Experience"}
            </p>
            {WorkExperience?.data?.map(
              (
                work,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    display:
                      "flex",
                    paddingLeft:
                      "1.25rem",
                    flexDirection:
                      "column",
                    fontSize:
                      "11px",
                    lineHeight:
                      "1.2",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        flexDirection:
                          "column",
                        alignItems:
                          "flex-start",
                        gap: "0.5rem",
                      }}
                    >
                      <span>
                        <span
                          style={{
                            fontStyle:
                              "italic",
                          }}
                        >
                          {
                            work?.role
                          }
                        </span>
                        ,&nbsp;
                        <span
                          style={{
                            fontWeight:
                              "bold",
                          }}
                        >
                          {
                            work?.company_name
                          }
                        </span>
                        ,&nbsp;
                        <span>
                          {
                            work?.location
                          }
                        </span>
                      </span>
                      {work?.description && (
                        <div
                          style={{
                            maxWidth:
                              "6in",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              work.description,
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {formatDate(
                        work?.start_date
                      )}{" "}
                      -{" "}
                      {work?.end_date
                        ? formatDate(
                            work?.end_date
                          )
                        : "Present"}
                    </span>
                  </div>
                  {index +
                    1 !==
                    WorkExperience
                      ?.data
                      ?.length && (
                    <br />
                  )}
                </div>
              )
            )}
          </div>
        )}
        {Skills?.data &&
          Skills?.data
            .replace(
              /(<([^>]+)>)/gi,
              ""
            )
            .trim() !==
            "" && (
            <div
              style={{
                display:
                  "flex",
                flexDirection:
                  "column",
                fontSize:
                  "11px",
                marginTop:
                  "0.5rem",
              }}
            >
              <p
                style={{
                  fontWeight:
                    "bold",
                  textTransform:
                    "uppercase",
                  borderBottom:
                    "1px solid black",
                  marginBottom:
                    "0.625rem",
                }}
              >
                Skills
              </p>
              <div
                style={{
                  paddingLeft:
                    "1.25rem",
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    Skills?.data,
                }}
              />
            </div>
          )}
        {CustomField &&
          CustomField?.length >
            0 &&
          CustomField?.map(
            (
              custom,
              index
            ) => (
              <div
                key={
                  index
                }
                style={{
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  marginTop:
                    "0.5rem",
                }}
              >
                <p
                  style={{
                    fontSize:
                      "11px",
                    fontWeight:
                      "bold",
                    textTransform:
                      "uppercase",
                    borderBottom:
                      "1px solid black",
                    marginBottom:
                      "0.625rem",
                  }}
                >
                  {
                    custom?.fieldName
                  }
                </p>
                {custom?.fields?.map(
                  (
                    customData,
                    idx
                  ) => (
                    <div
                      key={
                        idx
                      }
                      style={{
                        display:
                          "flex",
                        paddingLeft:
                          "1.25rem",
                        flexDirection:
                          "column",
                        fontSize:
                          "11px",
                        lineHeight:
                          "1.2",
                      }}
                    >
                      <span>
                        <span
                          style={{
                            fontWeight:
                              "bold",
                          }}
                        >
                          {
                            customData?.header
                          }
                        </span>
                        ,&nbsp;
                        <span>
                          {
                            customData?.subHeader
                          }
                        </span>
                      </span>

                      {customData?.description && (
                        <div
                          style={{
                            maxWidth:
                              "100%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              customData.description,
                          }}
                        />
                      )}
                      {idx +
                        1 !==
                        custom
                          ?.fields
                          ?.length && (
                        <br />
                      )}
                    </div>
                  )
                )}
              </div>
            )
          )}
      </div>
    );
  };

export default Template1;
