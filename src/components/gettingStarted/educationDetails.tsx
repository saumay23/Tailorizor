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

const EducationDetails =
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
          name: "Education.data",
        }
      );
    return (
      <div className="w-full  h-full overflow-scroll ">
        {showTitle ? (
          <p className="text-xl md:text-3xl mb-10 font-semibold">
            {
              watch()
                ?.Education
                ?.fieldName
            }
          </p>
        ) : null}
        <div className="max-w-4xl items-start ">
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
                        ?.Education
                        ?.data?.[
                        index
                      ]
                        ?.Institute ||
                      errors
                        ?.Education
                        ?.data?.[
                        index
                      ]
                        ?.degree ||
                      errors
                        ?.Education
                        ?.data?.[
                        index
                      ]
                        ?.location ||
                      errors
                        ?.Education
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
                          ?.Education
                          ?.data?.[
                          index
                        ]
                          ?.Institute
                          ? watch()
                              ?.Education
                              ?.data?.[
                              index
                            ]
                              ?.Institute
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
                              ?.Education
                              ?.data?.[
                              index
                            ]
                              ?.Institute
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.Education
                                    ?.data?.[
                                    index
                                  ]
                                    ?.Institute
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                          <Input
                            className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                            {...register(
                              `Education.data.${index}.Institute`
                            )}
                          />
                        </div>
                        <div className=" flex flex-col">
                          <div className="mb-1 space-x-3 flex items-center">
                            <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                              Degree
                            </Label>
                            {errors
                              ?.Education
                              ?.data?.[
                              index
                            ]
                              ?.degree
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.Education
                                    ?.data?.[
                                    index
                                  ]
                                    ?.degree
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                          <Input
                            className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                            placeholder="John@example.com"
                            {...register(
                              `Education.data.${index}.degree`
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
                                ?.Education
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
                                `Education.data.${index}.start_date`,
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
                              ?.Education
                              ?.data?.[
                              index
                            ]
                              ?.end_date
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.Education
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
                                ?.Education
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
                                `Education.data.${index}.end_date`,
                                value
                              );
                              trigger(
                                [
                                  `Education.data.${index}.end_date`,
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
                              ?.Education
                              ?.data?.[
                              index
                            ]
                              ?.location
                              ?.message && (
                              <p className="text-red-500 text-xs md:text-sm font-medium">
                                {
                                  errors
                                    ?.Education
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
                              `Education.data.${index}.location`
                            )}
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col mt-4 max-w-4xl  ">
                        <div className="flex items-center space-x-3 mb-1 ">
                          <Label className=" text-xs md:text-sm font-extralight text-[#71717A] ">
                            Description
                          </Label>
                          {errors
                            ?.Education
                            ?.data?.[
                            index
                          ]
                            ?.description
                            ?.message && (
                            <p className="text-red-500 text-xs md:text-sm font-medium">
                              {
                                errors
                                  ?.Education
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
                                ?.Education
                                ?.data?.[
                                index
                              ]
                                ?.description
                            }
                            onChange={(
                              value: string
                            ) => {
                              setValue(
                                `Education.data.${index}.description`,
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
                  Institute:
                    "",
                  degree:
                    "",
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
              Education
            </div>
          </Button>
        </div>
      </div>
    );
  };

export default EducationDetails;
