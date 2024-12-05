"use client";
import React, {
  useState,
} from "react";
import Editor from "../ui/rich-text/editor";
import { useFormContext } from "react-hook-form";
import { ProfileType } from "@/lib/types/profile";

const Skills =
  ({
    showTitle = true,
  }: {
    showTitle?: boolean;
  }) => {
    const {
      watch,
      setValue,
    } =
      useFormContext<ProfileType>();

    return (
      <div className="w-full  h-full overflow-scroll ">
        {showTitle ? (
          <p className="text-xl md:text-3xl mb-10 font-semibold">
            Skills
          </p>
        ) : null}
        <div className="max-w-4xl ">
          <Editor
            content={
              watch()
                ?.Skills
                ?.data
            }
            onChange={(
              value: string
            ) => {
              setValue(
                "Skills.data",
                value
              );
            }}
            placeholder="Write your post here..."
          />
        </div>
      </div>
    );
  };

export default Skills;
