"use client";
import { ResumeType } from "@/lib/types/resume";
import { renderToStaticMarkup } from "react-dom/server";
import React, {
  useState,
} from "react";
import {
  AiFillFilePdf,
  AiOutlineDownload,
  AiOutlineEye,
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
      useState<
        | number
        | null
      >(
        null
      );
    const router =
      useRouter();
    const downloadResume =
      async (
        resume: ResumeType,
        index: number
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
          index
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
            null
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
      <div className="w-full h-full px-4 sm:px-8 lg:px-20 py-5 sm:py-8 lg:py-10 mx-2 sm:mx-5 lg:mx-10 flex flex-col space-y-5 sm:space-y-8 lg:space-y-10">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold">
          Resumes
        </p>
        <div className="flex-1 overflow-scroll">
          <div className="flex flex-col space-y-4">
            {resumes?.map(
              (
                resume,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="flex items-center border-b border-gray-300 py-3"
                >
                  {/* PDF Icon */}
                  <div className="flex justify-center items-center w-[min(10%,150px)]">
                    <AiFillFilePdf className="w-6 h-6 text-red-400" />
                  </div>

                  {/* Resume Name */}
                  <div className="flex justify-start items-center flex-grow px-4">
                    <p className="break-words text-ellipsis line-clamp-2">
                      {
                        resume.resumeName
                      }
                    </p>
                  </div>

                  {/* Actions (View, Download, Delete) */}
                  <div className="flex justify-center items-center w-[min(20%,200px)] space-x-3">
                    <AiOutlineDownload
                      className="w-5 h-5 text-green-500 cursor-pointer"
                      onClick={() => {
                        downloadResume(
                          resume,
                          index
                        );
                      }}
                    />
                    <RxCross2
                      className={`${
                        resume.resumeName ===
                        "Default"
                          ? "cursor-not-allowed text-gray-500"
                          : "text-red-500 cursor-pointer"
                      } w-5 h-5`}
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
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

export default DashBoardComponent;
