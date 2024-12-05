import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { ProfileType } from "@/lib/types/profile";
const PersonalDetails =
  ({
    showTitle = true,
  }: {
    showTitle?: boolean;
  }) => {
    const methods =
      useFormContext<ProfileType>();
    const {
      register,
      formState:
        {
          errors,
        },
    } =
      methods;
    return (
      <div className="w-full max-w-6xl   overflow-scroll ">
        {showTitle ? (
          <p className="text-xl md:text-3xl mb-10 font-semibold">
            Personal
            Details
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className=" flex flex-col">
            <div className="flex space-x-3 items-center mb-1">
              <Label
                htmlFor="name"
                className="text-xs md:text-sm font-extralight text-[#71717A] "
              >
                Name
              </Label>
              {errors
                ?.personalDetails
                ?.name
                ?.message && (
                <p className="text-red-500 text-xs md:text-sm font-medium">
                  {
                    errors
                      ?.personalDetails
                      ?.name
                      ?.message
                  }
                </p>
              )}
            </div>
            <Input
              id="name"
              className=" px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="John"
              {...register(
                "personalDetails.name"
              )}
            />
          </div>
          <div className=" flex flex-col">
            <div className="flex space-x-3 items-center mb-1">
              <Label
                htmlFor="email"
                className="text-xs md:text-sm font-extralight text-[#71717A] "
              >
                Email
              </Label>
              {errors
                ?.personalDetails
                ?.email
                ?.message && (
                <p className="text-red-500 text-xs md:text-sm font-medium">
                  {
                    errors
                      ?.personalDetails
                      ?.email
                      ?.message
                  }
                </p>
              )}
            </div>
            <Input
              id="email"
              type="email"
              className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="John@example.com"
              {...register(
                "personalDetails.email"
              )}
            />
          </div>
          <div className=" flex flex-col">
            <Label
              htmlFor="phone"
              className="text-xs md:text-sm font-extralight text-[#71717A] mb-1"
            >
              Phone
            </Label>
            <Input
              id="phone"
              className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="+1 XXX XXX XXX"
              {...register(
                "personalDetails.contact_no"
              )}
            />
          </div>
          <div className=" flex flex-col">
            <Label
              htmlFor="country"
              className="text-xs md:text-sm font-extralight text-[#71717A] mb-1"
            >
              Country
            </Label>
            <Input
              id="country"
              className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="USA"
              {...register(
                "personalDetails.country"
              )}
            />
          </div>
          <div className=" flex flex-col">
            <Label
              htmlFor="city"
              className="text-xs md:text-sm font-extralight text-[#71717A] mb-1"
            >
              City
            </Label>
            <Input
              id="city"
              className="px-3 py-2 border text-sm border-[#DDDDDD] rounded-md outline-none w-full placeholder:text-[#DDDDDD]"
              placeholder="Austin"
              {...register(
                "personalDetails.city"
              )}
            />
          </div>
        </div>
      </div>
    );
  };

export default PersonalDetails;
