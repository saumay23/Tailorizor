"use client";
import {
  ProfileType,
  schema,
} from "@/lib/types/profile";
import React, {
  useState,
} from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import PersonalDetails from "../gettingStarted/personalDetails";
import RoleDetails from "../gettingStarted/roleDetails";
import EducationDetails from "../gettingStarted/educationDetails";
import WorkExperienceDetails from "../gettingStarted/workExperience";
import Skills from "../gettingStarted/skills";
import { Button } from "../ui/button";
import CustomSection from "../gettingStarted/customSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../ui/input";
import { MdClose } from "react-icons/md";
import axios from "axios";
import {
  Bounce,
  ToastContainer,
  toast,
} from "react-toastify";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Template1 from "../ui/template/template1";

const ProfileForm =
  ({
    profile,
  }: {
    profile: ProfileType | null;
  }) => {
    if (
      !profile
    )
      return null;
    const [
      update,
      setUpdating,
    ] =
      useState<boolean>(
        false
      );
    const methods =
      useForm<ProfileType>(
        {
          mode: "all",
          defaultValues:
            profile,
          resolver:
            yupResolver(
              schema
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
      ProfileType
    > = async (
      data
    ) => {
      try {
        setUpdating(
          true
        );
        await axios.post(
          "/api/profile",
          data
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
        setUpdating(
          false
        );
      } finally {
      }
    };

    return (
      <>
        <ToastContainer />

        {update ? (
          <div className="min-w-screen min-h-screen flex justify-center items-center">
            <Loading
              message="Updating....."
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
                              {/* <CiEdit
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                              handleEditClick(
                                index
                              );
                            }}
                          /> */}
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
                        Save
                        Changes
                      </p>
                    </Button>
                  </div>
                  <div className="h-10"></div>
                </div>
              </FormProvider>
            </div>
            <div className="hidden md:block md:w-1/4 max-w-[9in] overflow-scroll mx-2 border box-border scrollbar-none flex-1">
              <Template1
                data={methods?.watch()}
              />
            </div>
          </div>
        )}
      </>
    );
  };

export default ProfileForm;
