import { NextResponse } from "next/server";
import chrome from "html-pdf-chrome";

export async function POST(
  req: Request
) {
  try {
    // Parse incoming HTML content
    const {
      html,
    } =
      await req.json();

    if (
      !html ||
      typeof html !==
        "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid HTML content",
        },
        {
          status: 400,
        }
      );
    }
    const htmlParser = `<html><head><style>body{margin: 0; padding : 0; width:
      "8.27in"; height:11.7in; }</style></head><body>${html}</body></html>`;
    // Define PDF options
    console.log(
      htmlParser
    );

    // Generate the PDF using html-pdf-chrome
    const pdfBuffer =
      await chrome.create(
        htmlParser
      );
    const pdfBlob =
      new Blob(
        [
          pdfBuffer.toBuffer(),
        ],
        {
          type: "application/pdf",
        }
      );

    // Return the PDF buffer as a response
    return new NextResponse(
      pdfBlob,
      {
        status: 200,
        headers:
          {
            "Content-Type":
              "application/pdf",
            "Content-Disposition":
              'attachment; filename="myPDF.pdf"',
          },
      }
    );
  } catch (error) {
    console.error(
      "Error processing request:",
      error
    );
    return NextResponse.json(
      {
        error:
          "Error processing the request",
      },
      {
        status: 500,
      }
    );
  }
}
