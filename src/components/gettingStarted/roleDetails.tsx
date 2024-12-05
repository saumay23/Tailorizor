"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import Editor from "../ui/rich-text/editor";
import { ProfileType } from "@/lib/types/profile";

const RoleDetails =
  ({
    showTitle = true,
  }: {
    showTitle?: boolean;
  }) => {
    const {
      register,
      setValue,
      watch,
      formState:
        {
          errors,
        },
    } = useFormContext<ProfileType>();

    return (
      <div className="w-full max-w-6xl  h-full overflow-scroll ">
        {showTitle ? (
          <p className="text-xl md:text-3xl mb-10 font-semibold">
            Job
            Details
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1">
          <div className=" flex flex-col">
            <div className="flex space-x-3 mb-1 items-center">
              <Label className="text-xs md:text-sm font-extralight text-[#71717A]">
                Desired
                Role
              </Label>
              {errors
                ?.roleDetails
                ?.role
                ?.message && (
                <p className="text-red-500 text-xs md:text-sm font-medium">
                  {
                    errors
                      ?.roleDetails
                      ?.role
                      ?.message
                  }
                </p>
              )}
            </div>
            <Input
              className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="Sales"
              {...register(
                "roleDetails.role"
              )}
            />
          </div>
          <div className=" flex flex-col">
            <div className="flex items-center space-x-3 mb-1">
              <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                LinkedIn
              </Label>
              {errors
                ?.roleDetails
                ?.linkedIn
                ?.message && (
                <p className="text-red-500 text-xs md:text-sm font-medium">
                  {
                    errors
                      ?.roleDetails
                      ?.linkedIn
                      ?.message
                  }
                </p>
              )}
            </div>
            <Input
              className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="URL"
              {...register(
                "roleDetails.linkedIn"
              )}
            />
          </div>
        </div>
        <div className=" flex flex-col mt-4 max-w-4xl  ">
          <Label className=" text-xs md:text-sm font-extralight text-[#71717A] mb-1">
            Summary
          </Label>
          <div>
            <Editor
              content={
                watch()
                  ?.roleDetails
                  ?.summary
              }
              onChange={(
                value: string
              ) => {
                setValue(
                  "roleDetails.summary",
                  value
                );
              }}
              placeholder="Write your summary here..."
            />
          </div>
        </div>
      </div>
    );
  };

export default RoleDetails;
