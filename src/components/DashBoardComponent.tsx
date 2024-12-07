"use client";
import { ResumeType } from "@/lib/types/resume";
import { renderToStaticMarkup } from "react-dom/server";
import React, {
  useState,
} from "react";
import {
  AiFillFilePdf,
  AiOutlineDownload,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Template1 from "./ui/template/template1";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const DashBoardComponent =
  ({
    resumes,
  }: {
    resumes: ResumeType[];
  }) => {
    const [
      isDownloading,
      setIsDownloading,
    ] =
      useState<boolean>(
        false
      );
    const router =
      useRouter();
    const downloadResume =
      async (
        resume: ResumeType
      ) => {
        const template =
          renderToStaticMarkup(
            <Template1
              data={
                resume
              }
            />
          );

        // Show loading indicator
        setIsDownloading(
          true
        );

        try {
          // Send the HTML content to the backend to generate the PDF
          const response =
            await axios.post(
              "/api/resume-download", // Replace with your correct API route
              {
                html: template,
              },
              {
                responseType:
                  "blob",
              } // Expect a Blob response (PDF file)
            );

          // Create a download link for the PDF
          const url =
            window.URL.createObjectURL(
              response.data
            );
          const link =
            document.createElement(
              "a"
            );
          link.href =
            url;
          link.download = `${
            resume?.resumeName ||
            "resume"
          }.pdf`; // Provide default filename if none exists
          link.click();

          // Revoke the object URL to free memory
          URL.revokeObjectURL(
            url
          );
        } catch (error) {
          console.error(
            "Error generating PDF:",
            error
          );
        } finally {
          setIsDownloading(
            false
          ); // Hide loading indicator
        }
      };
    const handleDelete =
      async (
        resume: ResumeType
      ) => {
        try {
          await axios.post(
            "/api/resumeDelete",
            resume
          );
          router.refresh();
        } catch (error) {
          console.error(
            "Failed to delete  PDF:",
            error
          );
        }
      };
    return (
      <div className="px-4 sm:px-8 lg:px-20 py-5 sm:py-8 lg:py-10 mx-2 sm:mx-5 lg:mx-10 flex flex-col space-y-5 sm:space-y-8 lg:space-y-10">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold">
          Resumes
        </p>
        <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8  border-dashed justify-center px-4 sm:px-6 lg:px-10 py-5 border overflow-y-scroll scrollbar-thin">
          {resumes?.map(
            (
              resume,
              index
            ) => {
              return (
                <div
                  className="flex justify-around flex-col w-full max-w-[120px] sm:max-w-[180px] lg:max-w-[200px] space-y-3 sm:space-y-4 lg:space-y-5 p-2 sm:p-3 lg:p-4 border items-center rounded-md shadow-sm"
                  key={
                    index
                  }
                >
                  <div className="flex w-full justify-center items-center space-y-2 flex-col">
                    <div className="flex justify-end w-full ">
                      <RxCross2
                        className={`${
                          resume.resumeName ===
                          "Default"
                            ? "cursor-not-allowed text-gray-500"
                            : "text-red-500 cursor-pointer"
                        } w-5 h-5  `}
                        onClick={() => {
                          if (
                            resume.resumeName !==
                            "Default"
                          )
                            handleDelete(
                              resume
                            );
                        }}
                      />
                    </div>
                    <AiFillFilePdf className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-400" />
                  </div>
                  <div className="w-full  flex justify-between items-center space-x-2 sm:space-x-3 lg:space-x-4">
                    <p className="w-[60%] text-sm sm:text-base break-words text-ellipsis line-clamp-2">
                      {
                        resume.resumeName
                      }
                    </p>
                    {isDownloading ? (
                      <Loading
                        size={
                          25
                        }
                        displayMessage={
                          false
                        }
                      />
                    ) : (
                      <AiOutlineDownload
                        className="w-5 h-5  cursor-pointer"
                        onClick={() => {
                          downloadResume(
                            resume
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  };

export default DashBoardComponent;
