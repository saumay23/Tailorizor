"use client";
import React, {
  useState,
} from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { MdClose } from "react-icons/md";
import axios from "axios";
import {
  Bounce,
  ToastContainer,
  toast,
} from "react-toastify";

import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import {
  ResumeSchema,
  ResumeType,
} from "@/lib/types/resume";
import Loading from "./Loading";
import PersonalDetails from "./gettingStarted/personalDetails";
import RoleDetails from "./gettingStarted/roleDetails";
import EducationDetails from "./gettingStarted/educationDetails";
import WorkExperienceDetails from "./gettingStarted/workExperience";
import Skills from "./gettingStarted/skills";
import { Input } from "./ui/input";
import CustomSection from "./gettingStarted/customSection";
import { Button } from "./ui/button";
import Template1 from "./ui/template/template1";
import { Label } from "./ui/label";

const GeneratedResumeForm =
  ({
    data,
    user_id,
  }: {
    data: ResumeType;
    user_id: string;
  }) => {
    const [
      generate,
      setGenerating,
    ] =
      useState<boolean>(
        false
      );
    const methods =
      useForm<ResumeType>(
        {
          mode: "all",
          defaultValues:
            {
              ...data,
              user_id:
                user_id,
              CustomField:
                data?.CustomField ||
                [],
            },
          resolver:
            yupResolver(
              ResumeSchema
            ),
        }
      );
    const {
      handleSubmit,
    } =
      methods;
    const {
      fields,
      append,
      remove,
    } =
      useFieldArray(
        {
          control:
            methods.control,
          name: "CustomField",
        }
      );
    const router =
      useRouter();
    const handelSaveChanges: SubmitHandler<
      ResumeType
    > = async (
      data
    ) => {
      const payload: ResumeType =
        {
          resumeName:
            data?.resumeName,
          personalDetails:
            data?.personalDetails,
          roleDetails:
            data?.roleDetails,
          Education:
            data?.Education,
          WorkExperience:
            data?.WorkExperience,
          Skills:
            data?.Skills,
          user_id:
            data?.user_id,
          CustomField:
            data?.CustomField,
        };
      try {
        setGenerating(
          true
        );
        await axios.post(
          "/api/resume",
          payload
        );
        toast.success(
          "Successful ! Navigating to the dashboard",
          {
            position:
              "top-right",
            autoClose: 5000,
            hideProgressBar:
              false,
            closeOnClick:
              true,
            pauseOnHover:
              true,
            draggable:
              true,
            progress:
              undefined,
            theme:
              "light",
            transition:
              Bounce,
          }
        );
        setTimeout(
          () => {
            router.push(
              "/dashboard"
            );
          },
          3000
        );
      } catch (error) {
        console.log(
          "error",
          error
        );
        toast.error(
          "An Error Occured! Please try Again",
          {
            position:
              "top-right",
            autoClose: 5000,
            hideProgressBar:
              false,
            closeOnClick:
              true,
            pauseOnHover:
              true,
            draggable:
              true,
            progress:
              undefined,
            theme:
              "light",
            transition:
              Bounce,
          }
        );
        setGenerating(
          false
        );
      }
    };

    return (
      <>
        <ToastContainer />

        {generate ? (
          <div className="min-w-screen min-h-screen flex justify-center items-center">
            <Loading
              message="Generating PDF....."
              className="text-primary"
              size={
                100
              }
            />
          </div>
        ) : (
          <div className="w-full h-full  max-w-8xl mx-auto flex  py-10 px-10">
            <div
              className="md:w-1/2 w-full h-full overflow-scroll scrollbar-none
              "
            >
              <FormProvider
                {...methods}
              >
                <div className="flex-1   space-y-10 ">
                  <div className=" flex flex-col space-y-3">
                    <div className="flex space-x-3 items-center mb-1">
                      <Label
                        htmlFor="fileName"
                        className="text-xs md:text-sm font-extralight text-[#71717A] "
                      >
                        File
                        Name
                      </Label>
                      {methods
                        ?.formState
                        ?.errors
                        ?.resumeName
                        ?.message && (
                        <p className="text-red-500 text-xs md:text-sm font-medium">
                          {
                            methods
                              ?.formState
                              ?.errors
                              ?.resumeName
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                    <Input
                      id="email"
                      type="email"
                      className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                      placeholder="File Name"
                      {...methods?.register(
                        "resumeName"
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-4 ">
                    <span className="font-[family-name:var(--font-geist-sans)] md:text-xl text-lg tracking-wide underline font-medium">
                      Personal
                      Details
                    </span>
                    <div className="p-10 border-[#DDDDDD] border  bg-card shadow-lg rounded-lg">
                      <PersonalDetails
                        showTitle={
                          false
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 ">
                    <span className="font-[family-name:var(--font-geist-sans)] md:text-xl text-lg tracking-wide underline font-medium">
                      Role
                      Details
                    </span>
                    <div className="p-10 border-[#DDDDDD] border  bg-card shadow-lg rounded-lg">
                      <RoleDetails
                        showTitle={
                          false
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 ">
                    <span className="font-[family-name:var(--font-geist-sans)] md:text-xl text-lg tracking-wide underline font-medium">
                      Education
                    </span>
                    <div className="p-10 border-[#DDDDDD] border  bg-card shadow-lg rounded-lg">
                      <EducationDetails
                        showTitle={
                          false
                        }
                      />
                    </div>
                  </div>{" "}
                  <div className="flex flex-col space-y-4 ">
                    <span className="font-[family-name:var(--font-geist-sans)] md:text-xl text-lg tracking-wide underline font-medium">
                      Work
                      Experience
                    </span>
                    <div className="p-10 border-[#DDDDDD] border  bg-card shadow-lg rounded-lg">
                      <WorkExperienceDetails
                        showTitle={
                          false
                        }
                      />
                    </div>
                  </div>{" "}
                  <div className="flex flex-col space-y-4 ">
                    <span className="font-[family-name:var(--font-geist-sans)] md:text-xl text-lg tracking-wide underline font-medium">
                      Skills
                    </span>
                    <div className="p-10 border-[#DDDDDD] border  bg-card shadow-lg rounded-lg">
                      <Skills
                        showTitle={
                          false
                        }
                      />
                    </div>
                  </div>
                  {fields?.map(
                    (
                      customSection,
                      index
                    ) => {
                      return (
                        <div
                          key={`${customSection?.id}.${index}`}
                          className="flex flex-col space-y-4 "
                        >
                          <div className="w-full flex items-center justify-between ">
                            <div className="flex items-center space-x-5">
                              <Input
                                defaultValue={
                                  customSection?.fieldName
                                }
                                {...methods.register(
                                  `CustomField.${index}.fieldName`
                                )}
                                className="font-[family-name:var(--font-geist-sans)] py-8 md:text-xl text-lg tracking-wide underline focus:no-underline max-w-96 focus:outline focus:outline-[#DDDDDD] border-none font-medium "
                              />
                              {methods
                                ?.formState
                                ?.errors
                                ?.CustomField?.[
                                index
                              ]
                                ?.fieldName
                                ?.message && (
                                <p className="text-red-500 text-xs md:text-sm font-medium">
                                  {
                                    methods
                                      ?.formState
                                      ?.errors
                                      ?.CustomField?.[
                                      index
                                    ]
                                      ?.fieldName
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-10">
                              <MdClose
                                className="w-6 h-6 text-red-500 cursor-pointer"
                                onClick={() => {
                                  remove(
                                    index
                                  );
                                  methods.setValue(
                                    "CustomField",
                                    methods.getValues(
                                      "CustomField"
                                    )
                                  ); // Sync with current state
                                }}
                              />
                            </div>
                          </div>
                          <div className="p-10 border-[#DDDDDD] border  bg-card shadow-lg rounded-lg">
                            <CustomSection
                              fieldIdx={
                                index
                              }
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                  <div className="flex w-full  justify-between">
                    <Button
                      size="lg"
                      type="button"
                      className="flex my-4 items-center p-3 w-full max-w-36  md:max-w-96 rounded-xl mx-auto font-semibold space-x-2 "
                      onClick={() =>
                        append(
                          {
                            fieldName: `Custom Section ${
                              fields.length +
                              1
                            }`,
                            fields:
                              [
                                {
                                  header:
                                    "",
                                  subHeader:
                                    "",
                                  description:
                                    "",
                                },
                              ],
                          }
                        )
                      }
                    >
                      <p>
                        Add
                        Section
                      </p>
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleSubmit(
                        handelSaveChanges
                      )}
                      type="submit"
                      className="flex my-4 items-center p-3 w-full max-w-36  md:max-w-96 rounded-xl mx-auto font-semibold space-x-2 "
                    >
                      <p>
                        Generate
                        PDF
                      </p>
                    </Button>
                  </div>
                  <div className="h-10"></div>
                </div>
              </FormProvider>
            </div>
            <div className="hidden py-[0.5in]  md:block md:w-1/4 max-w-[9in] overflow-scroll mx-2 border box-border scrollbar-none flex-1">
              <Template1
                data={methods?.watch()}
              />
            </div>
          </div>
        )}
      </>
    );
  };

export default GeneratedResumeForm;
