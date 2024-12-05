"use client";
import EducationDetails from "@/components/gettingStarted/educationDetails";
import PersonalDetails from "@/components/gettingStarted/personalDetails";
import RoleDetails from "@/components/gettingStarted/roleDetails";
import Skills from "@/components/gettingStarted/skills";
import WorkExperience from "@/components/gettingStarted/workExperience";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import {
  useForm,
  FormProvider,
} from "react-hook-form";
import React, {
  useState,
} from "react";
import {
  ProfileType,
  schema,
} from "@/lib/types/profile";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Bounce,
  ToastContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
const GettingStarted =
  ({
    userId,
  }: {
    userId: string;
  }) => {
    const [
      currentStep,
      setCurrentStep,
    ] =
      useState<number>(
        1
      );
    const [
      submitting,
      setSubmitting,
    ] =
      useState<boolean>(
        false
      );
    const router =
      useRouter();

    const methods =
      useForm<ProfileType>(
        {
          mode: "onChange",
          resolver:
            yupResolver(
              schema
            ),
          defaultValues:
            {
              Education:
                {
                  fieldName:
                    "Education Details",
                  data: [
                    {
                      Institute:
                        "",
                      degree:
                        "",
                      start_date:
                        undefined,
                      end_date:
                        undefined,
                      location:
                        "",
                      description:
                        "",
                    },
                  ],
                },
              WorkExperience:
                {
                  fieldName:
                    "Work Experience",
                  data: [
                    {
                      company_name:
                        "",
                      start_date:
                        undefined,
                      end_date:
                        undefined,
                      role: "",
                      description:
                        "",
                      location:
                        "",
                    },
                  ],
                },
            },
          shouldUnregister:
            false,
        }
      );
    const handleNextStep =
      async () => {
        const {
          trigger,
          watch,
        } =
          methods;
        let isValid =
          false;
        switch (
          currentStep
        ) {
          case 1: {
            isValid =
              await trigger(
                [
                  "personalDetails.name",
                  "personalDetails.email",
                ]
              );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 2: {
            isValid =
              await trigger(
                [
                  "roleDetails.role",
                  "roleDetails.linkedIn",
                ]
              );

            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 3: {
            isValid =
              await trigger(
                [
                  "Education.data",
                ]
              );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 4: {
            const isValid =
              await trigger(
                [
                  "WorkExperience.data",
                ]
              );
            if (
              isValid
            )
              setCurrentStep(
                currentStep +
                  1
              );
            break;
          }
          case 5: {
            const data: ProfileType =
              {
                user_id:
                  userId,
                Education:
                  watch()
                    ?.Education,
                WorkExperience:
                  watch()
                    ?.WorkExperience,
                personalDetails:
                  watch()
                    ?.personalDetails,
                roleDetails:
                  watch()
                    ?.roleDetails,
                Skills:
                  watch()
                    ?.Skills,
                CustomField:
                  watch()
                    ?.CustomField,
              };
            setSubmitting(
              true
            );
            try {
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
                5000
              );
            } catch (error) {
              console.log(
                error
              );
              setSubmitting(
                false
              );
              toast.error(
                "An Error Occured! Please try Again after sometime",
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
            }
          }
        }
      };
    return (
      <>
        <ToastContainer />
        {submitting ? (
          <div className="min-w-screen min-h-screen flex justify-center items-center">
            <Loading
              className="text-primary"
              size={
                100
              }
            />
          </div>
        ) : (
          <div className="min-h-screen min-w-screen px-10 flex flex-col py-10 ">
            <div className="flex flex-col pb-4">
              <p className="text-2xl md:text-4xl lg:text-5xl">
                Getting
                Started
              </p>
              <Progress
                className="mt-6 lg:mt-10 mb-4"
                value={
                  (currentStep /
                    6) *
                  100
                }
              />
              <p className="text-lg max-w-3xl lg:text-2xl underline tracking-wide">
                Step&nbsp;
                {
                  currentStep
                }
              </p>
            </div>
            <FormProvider
              {...methods}
            >
              <div className="flex-1 pb-4 ">
                <div
                  className={`${
                    currentStep ===
                    1
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <PersonalDetails />
                </div>
                <div
                  className={`${
                    currentStep ===
                    2
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <RoleDetails />
                </div>
                <div
                  className={`${
                    currentStep ===
                    3
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <EducationDetails />
                </div>
                <div
                  className={`${
                    currentStep ===
                    4
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <WorkExperience />
                </div>
                <div
                  className={`${
                    currentStep ===
                    5
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <Skills />
                </div>
              </div>
            </FormProvider>
            <div className="flex justify-between items-center px-4 md:px-10 lg:px-96">
              <Button
                variant="outline"
                size={
                  "lg"
                }
                disabled={
                  currentStep ===
                  1
                }
                onClick={() =>
                  setCurrentStep(
                    currentStep -
                      1
                  )
                }
              >
                Back
              </Button>
              <Button
                onClick={
                  handleNextStep
                }
                size={
                  "lg"
                }
              >
                {currentStep ===
                5
                  ? "Save & Proceed"
                  : "Next"}
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

export default GettingStarted;
