"use client";
import React from "react";
import Image from "next/image";
import { CiMenuFries } from "react-icons/ci";
import {
  PiSignOutThin,
  PiUser,
} from "react-icons/pi";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { HandleLogout } from "@/lib/handleLogout";
import Link from "next/link";

const Navbar =
  () => {
    return (
      <header className="flex h-20 justify-between w-full shrink-0 border-b items-center px-4 md:px-6  font-[family-name:var(--font-lato)]">
        <div className=" items-center justify-center space-x-4 hidden md:flex">
          <div className="flex h-14 w-14 justify-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={
                100
              }
              height={
                100
              }
              priority
              sizes="100vw"
              style={{
                width:
                  "100%",
                height:
                  "auto",
                filter:
                  "brightness(0) saturate(100%)", // Makes the image black
              }}
            />
          </div>
          <span className="font-[family-name:var(--font-arkhip-regular)] capitalize  text-xl lg:text-2xl">
            Tailorizor
          </span>
        </div>
        <div className="md:hidden ">
          <Sheet>
            <SheetTrigger className="flex justify-center items-center">
              <CiMenuFries className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent
              side={
                "left"
              }
              className="flex items-center justify-between flex-col"
            >
              <div className="flex flex-col space-y-4 items-center">
                <div className="flex h-14 w-14 justify-center">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={
                      100
                    }
                    height={
                      100
                    }
                    priority
                    sizes="100vw"
                    style={{
                      width:
                        "100%",
                      height:
                        "auto",
                      filter:
                        "brightness(0) saturate(100%)", // Makes the image black
                    }}
                  />
                </div>
                <span className="font-[family-name:var(--font-arkhip-regular)] capitalize  text-xl lg:text-2xl">
                  Tailorizor
                </span>
              </div>

              <nav className="flex flex-col justify-center items-center gap-8">
                <Link
                  href={
                    "/dashboard"
                  }
                >
                  <SheetClose>
                    <SheetTitle className="text-base font-normal">
                      <p className="cursor-pointer ">
                        Dashboard
                      </p>
                    </SheetTitle>
                  </SheetClose>
                </Link>
                <Link
                  href={
                    "resume"
                  }
                >
                  <SheetClose>
                    <SheetTitle className="text-base font-normal">
                      <p className="cursor-pointer ">
                        Resume
                      </p>
                    </SheetTitle>
                  </SheetClose>
                </Link>
                {/* <Link
                  href={
                    "/coverLetter"
                  }
                >
                  <SheetClose>
                    <SheetTitle className="text-base font-normal">
                      <p className="cursor-pointer ">
                        Cover
                        Letter
                      </p>
                    </SheetTitle>
                  </SheetClose>
                </Link> */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex space-x-10 lg:space-x-20 items-center ">
          <div className="hidden md:flex">
            <nav>
              <div className="flex  items-center space-x-10 ">
                <Link
                  href={
                    "/dashboard"
                  }
                >
                  <span className="cursor-pointer transition-all hover:underline hover:scale-125 hover:font-bold ">
                    Dashboard
                  </span>
                </Link>
                <Link href="/resume">
                  <span className="cursor-pointer transition-all hover:underline hover:scale-125 hover:font-bold ">
                    Resume
                  </span>
                </Link>
                {/* <Link href="/coverLetter">
                  <span className="cursor-pointer transition-all hover:underline hover:scale-125 hover:font-bold ">
                    Cover
                    Letter
                  </span>
                </Link> */}
              </div>
            </nav>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border rounded-md px-4 py-3">
              <div className="flex items-center text-sm justify-between">
                <span>
                  My
                  Account
                </span>
                <MdOutlineKeyboardArrowDown className="w-6 h-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 mr-5">
              <DropdownMenuItem
                asChild
                className="py-2"
              >
                <Link
                  href={
                    "/profile"
                  }
                >
                  <div className="flex items-center  w-full space-x-4">
                    <PiUser className="w-6 h-6" />
                    <span>
                      Profile
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="py-2"
                onClick={
                  HandleLogout
                }
              >
                <div className="flex items-center  w-full space-x-4">
                  <PiSignOutThin className="w-6 h-6" />
                  <span>
                    Logout
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  };

export default Navbar;
