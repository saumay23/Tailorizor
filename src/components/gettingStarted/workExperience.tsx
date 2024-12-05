"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Editor from "../ui/rich-text/editor";
import { DatePicker } from "../ui/datepicker";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { ProfileType } from "@/lib/types/profile";
import { TrashIcon } from "lucide-react";

const WorkExperienceDetails =
  ({
    showTitle = true,
  }: {
    showTitle?: boolean;
  }) => {
    const {
      register,
      control,
      formState:
        {
          errors,
        },
      watch,
      setValue,
      trigger,
    } = useFormContext<ProfileType>();
    const {
      fields,
      append,
      remove,
    } =
      useFieldArray(
        {
          control:
            control,
          name: "WorkExperience.data",
        }
      );
    return (
      <div className="w-full  h-full overflow-scroll ">
        {showTitle ? (
          <p className="text-xl md:text-3xl mb-10 font-semibold">
            {
              watch()
                ?.WorkExperience
                ?.fieldName
            }
          </p>
        ) : null}
        <div className="max-w-4xl items-start">
          <Accordion
            className="  px-2 w-full space-y-4  "
            type="single"
            collapsible
          >
            {fields?.map(
              (
                field,
                index
              ) => (
                <div
                  className=" w-full flex space-x-3 items-start"
                  key={`${field}.${index}`}
                >
                  <AccordionItem
                    className={` ${
                      errors
                        ?.WorkExperience
                        ?.data?.[
                        index
                      ]
                        ?.company_name ||
                      errors
                        ?.WorkExperience
                        ?.data?.[
                        index
                      ]
                        ?.role ||
                      errors
                        ?.WorkExperience
                        ?.data?.[
                        index
                      ]
                        ?.location ||
                      errors
                        ?.WorkExperience
                        ?.data?.[
                        index
                      ]
                        ?.end_date
                        ? "border-red-300 "
                        : "border-[#e4e4e7] "
                    } w-full rounded-xl border`}
                    value={`${field}.${index}`}
                  >
                    <AccordionTrigger className="px-4">
                      <p>
                        {watch()
                          ?.WorkExperience
                          ?.data?.[
                          index
                        ]
                          ?.company_name
                          ? watch()
                              ?.WorkExperience
                              ?.data?.[
                              index
                            ]
                              ?.company_name
                          : "Untitled"}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 space-y-3 ">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className=" flex flex-col">
                          <div className="flex space-x-3 mb-1 items-center">
                            <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                              Institution
                            </Label>
                            {errors
                              ?.WorkExperience
                              ?.data?.[
                              index
                            ]
                              ?.company_name
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.WorkExperience
                                    ?.data?.[
                                    index
                                  ]
                                    ?.company_name
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                          <Input
                            className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                            {...register(
                              `WorkExperience.data.${index}.company_name`
                            )}
                          />
                        </div>
                        <div className=" flex flex-col">
                          <div className="mb-1 space-x-3 flex items-center">
                            <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                              role
                            </Label>
                            {errors
                              ?.WorkExperience
                              ?.data?.[
                              index
                            ]
                              ?.role
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.WorkExperience
                                    ?.data?.[
                                    index
                                  ]
                                    ?.role
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                          <Input
                            className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                            placeholder="John@example.com"
                            {...register(
                              `WorkExperience.data.${index}.role`
                            )}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className=" flex flex-col">
                          <Label className=" text-xs md:text-sm font-extralight text-[#71717A] mb-1">
                            Start
                            Date
                          </Label>
                          <DatePicker
                            date={
                              watch()
                                ?.WorkExperience
                                ?.data?.[
                                index
                              ]
                                ?.start_date
                            }
                            setDate={(
                              value:
                                | Date
                                | undefined
                            ) => {
                              setValue(
                                `WorkExperience.data.${index}.start_date`,
                                value
                              );
                            }}
                          />
                        </div>
                        <div className=" flex flex-col">
                          <div className="flex space-x-3">
                            <Label className="text-xs md:text-sm font-extralight text-[#71717A] mb-1">
                              End
                              Date
                            </Label>
                            {errors
                              ?.WorkExperience
                              ?.data?.[
                              index
                            ]
                              ?.end_date
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.WorkExperience
                                    ?.data?.[
                                    index
                                  ]
                                    ?.end_date
                                    ?.message
                                }
                              </p>
                            )}
                          </div>

                          <DatePicker
                            date={
                              watch()
                                ?.WorkExperience
                                ?.data?.[
                                index
                              ]
                                ?.end_date
                            }
                            setDate={(
                              value:
                                | Date
                                | undefined
                            ) => {
                              setValue(
                                `WorkExperience.data.${index}.end_date`,
                                value
                              );
                              trigger(
                                [
                                  `WorkExperience.data.${index}.end_date`,
                                ]
                              );
                            }}
                          />
                        </div>
                        <div className=" flex flex-col col-span-2 lg:col-span-1">
                          <div className="flex space-x-3 items-center mb-1">
                            <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                              Location
                            </Label>
                            {errors
                              ?.WorkExperience
                              ?.data?.[
                              index
                            ]
                              ?.location
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.WorkExperience
                                    ?.data?.[
                                    index
                                  ]
                                    ?.location
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                          <Input
                            className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                            placeholder="Austin"
                            {...register(
                              `WorkExperience.data.${index}.location`
                            )}
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col mt-4 max-w-4xl ">
                        <div className="flex items-center space-x-3 mb-1 ">
                          <Label className=" text-xs md:text-sm font-extralight text-[#71717A] ">
                            Description
                          </Label>
                          {errors
                            ?.WorkExperience
                            ?.data?.[
                            index
                          ]
                            ?.description
                            ?.message && (
                            <p className="text-red-500 text-xs md:text-sm font-medium">
                              {
                                errors
                                  ?.WorkExperience
                                  ?.data?.[
                                  index
                                ]
                                  ?.description
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <Editor
                            content={
                              watch()
                                ?.WorkExperience
                                ?.data?.[
                                index
                              ]
                                ?.description
                            }
                            onChange={(
                              value: string
                            ) => {
                              setValue(
                                `WorkExperience.data.${index}.description`,
                                value
                              );
                            }}
                            placeholder="Write your post here..."
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <TrashIcon
                    onClick={() => {
                      if (
                        fields?.length >
                        1
                      )
                        remove(
                          index
                        );
                    }}
                    className="w-5 h-5 text-red-300 mt-4"
                  />
                </div>
              )
            )}
          </Accordion>
          <Button
            size="lg"
            className="flex my-4 items-center p-3 w-full max-w-96 rounded-xl mx-auto font-semibold space-x-2"
            onClick={() =>
              append(
                {
                  company_name:
                    "",
                  role: "",
                  start_date:
                    undefined,
                  end_date:
                    undefined,
                  description:
                    "",
                  location:
                    "",
                }
              )
            }
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 5.75v12.5M18.25 12H5.75"
              ></path>
            </svg>
            <div>
              Add
              WorkExperience
            </div>
          </Button>
        </div>
      </div>
    );
  };

export default WorkExperienceDetails;
