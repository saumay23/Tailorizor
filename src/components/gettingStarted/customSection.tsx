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
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { ProfileType } from "@/lib/types/profile";
import { TrashIcon } from "lucide-react";

const CustomSection =
  ({
    showTitle = true,
    fieldIdx,
  }: {
    showTitle?: boolean;
    fieldIdx: number;
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
          name: `CustomField.${fieldIdx}.fields`,
        }
      );

    return (
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
                      ?.CustomField?.[
                      fieldIdx
                    ]
                      ?.fields?.[
                      index
                    ]
                      ?.header ||
                    errors
                      ?.CustomField?.[
                      fieldIdx
                    ]
                      ?.fields?.[
                      index
                    ]
                      ?.subHeader
                      ? "border-red-300 "
                      : "border-[#e4e4e7] "
                  } w-full rounded-xl border`}
                  value={`${field}.${index}`}
                >
                  <AccordionTrigger className="px-4">
                    <p>
                      {watch()
                        ?.CustomField?.[
                        fieldIdx
                      ]
                        ?.fields?.[
                        index
                      ]
                        ?.header
                        ? watch()
                            ?.CustomField?.[
                            fieldIdx
                          ]
                            ?.fields?.[
                            index
                          ]
                            ?.header
                        : "Untitled"}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className=" flex flex-col">
                        <div className="flex space-x-3 mb-1 items-center">
                          <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                            Header
                          </Label>
                          {errors
                            ?.CustomField?.[
                            fieldIdx
                          ]
                            ?.fields?.[
                            index
                          ]
                            ?.header
                            ?.message && (
                            <p className="text-red-500 text-xs md:text-sm font-medium">
                              {
                                errors
                                  ?.CustomField?.[
                                  fieldIdx
                                ]
                                  ?.fields?.[
                                  index
                                ]
                                  ?.header
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <Input
                          className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                          {...register(
                            `CustomField.${fieldIdx}.fields.${index}.header`
                          )}
                        />
                      </div>
                      <div className=" flex flex-col">
                        <div className="mb-1 space-x-3 flex items-center">
                          <Label className="text-xs md:text-sm font-extralight text-[#71717A] ">
                            Sub
                            Header
                          </Label>
                          {errors
                            ?.CustomField?.[
                            fieldIdx
                          ]
                            ?.fields?.[
                            index
                          ]
                            ?.subHeader
                            ?.message && (
                            <p className="text-red-500 text-xs md:text-sm font-medium">
                              {
                                errors
                                  ?.CustomField?.[
                                  fieldIdx
                                ]
                                  ?.fields?.[
                                  index
                                ]
                                  ?.subHeader
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <Input
                          className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
                          placeholder="John@example.com"
                          {...register(
                            `CustomField.${fieldIdx}.fields.${index}.subHeader`
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
                          ?.CustomField?.[
                          fieldIdx
                        ]
                          ?.fields?.[
                          index
                        ]
                          ?.description
                          ?.message && (
                          <p className="text-red-500 text-xs md:text-sm font-medium">
                            {
                              errors
                                ?.CustomField?.[
                                fieldIdx
                              ]
                                ?.fields?.[
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
                              ?.CustomField?.[
                              fieldIdx
                            ]
                              ?.fields?.[
                              index
                            ]
                              ?.description
                          }
                          onChange={(
                            value: string
                          ) => {
                            setValue(
                              `CustomField.${fieldIdx}.fields.${index}.description`,
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
                header:
                  "",
                subHeader:
                  "",
                description:
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
            Line
            Item
          </div>
        </Button>
      </div>
    );
  };

export default CustomSection;
