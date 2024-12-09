"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, {
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { ResumeType } from "@/lib/types/resume";
import Loading from "./Loading";
import {
  toast,
  Bounce,
  ToastContainer,
} from "react-toastify";
import GeneratedResumeForm from "./GeneratedResumeForm";

const ResumeComponent =
  ({
    user_id,
  }: {
    user_id: string;
  }) => {
    const {
      register,
      handleSubmit,
      formState:
        {
          errors,
        },
    } = useForm<{
      jobDescription: string;
    }>(
      {
        mode: "all",
      }
    );
    const submitHandle =
      async (data: {
        jobDescription: string;
      }) => {
        try {
          setIsGenerating(
            true
          );
          const req =
            await axios.post(
              "/api/resumeTailor",
              {
                user_id:
                  user_id,
                jobDescription:
                  data.jobDescription,
              }
            );
          console.log(
            JSON.parse(
              req.data
            )
          );
          setGeneratedResumeData(
            JSON.parse(
              req.data
            )
          );
        } catch (error) {
          toast.error(
            "Sorry! There might be some techincal Issue, Please try Again after sometime",
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
          console.log(
            error
          );
        } finally {
          setIsGenerating(
            false
          );
        }
      };
    const [
      isGenerating,
      setIsGenerating,
    ] =
      useState<boolean>(
        false
      );
    const [
      generatedResumeData,
      setGeneratedResumeData,
    ] =
      useState<ResumeType | null>(
        null
      );
    return (
      <>
        <div className="w-screen h-[calc(100vh_-_5rem)]  mx-auto ">
          {generatedResumeData ? (
            <>
              <GeneratedResumeForm
                user_id={
                  user_id
                }
                data={
                  generatedResumeData
                }
              />
            </>
          ) : (
            <>
              {isGenerating ? (
                <div className="w-full flex items-center justify-center h-full">
                  <Loading
                    size={
                      100
                    }
                    message="Generating Resume from Job Description, Please Wait ...."
                  />
                </div>
              ) : (
                <div className="space-y-4  p-6  w-full h-full flex flex-col justify-between">
                  <div className=" flex flex-col mt-4 w-full max-w-6xl  ">
                    <div className="flex  space-x-3 mb-1 ">
                      <Label className=" text-xs md:text-sm font-extralight text-[#71717A] ">
                        Job
                        Description
                      </Label>
                      {errors
                        ?.jobDescription
                        ?.message && (
                        <p className="text-red-500 text-xs md:text-sm font-medium">
                          {
                            errors
                              ?.jobDescription
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <Textarea
                        className="resize-none min-h-96"
                        {...register(
                          "jobDescription",
                          {
                            required:
                              "This is Required",
                          }
                        )}
                      />
                    </div>
                  </div>

                  <div className="text-center flex justify-end">
                    <Button
                      onClick={handleSubmit(
                        submitHandle
                      )}
                      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <ToastContainer />
      </>
    );
  };

export default ResumeComponent;
