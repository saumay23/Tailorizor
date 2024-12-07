import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  req: Request
) {
  try {
    // Parse incoming request body
    const {
      html,
    } =
      await req.json();

    // Validate the HTML content
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
    if (
      !process
        .env
        .BACKEND_URL
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid Backend URL ",
        },
        {
          status: 400,
        }
      );
    }

    // Add styling and wrap HTML content in a complete document
    const htmlParser = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              width: 8.27in;
              height: 11.7in;
            }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    // Call the Python backend API to generate the PDF

    const response =
      await axios.post(
        `${process.env.BACKEND_URL}/generate-pdf`,
        {
          html: htmlParser,
        },
        {
          responseType:
            "arraybuffer",
        } // Receive the response as binary data
      );

    // Return the PDF data as the response
    return new NextResponse(
      response.data,
      {
        status: 200,
        headers:
          {
            "Content-Type":
              "application/pdf",
            "Content-Disposition":
              "attachment; filename=document.pdf",
          },
      }
    );
  } catch (error: unknown) {
    // Handle errors during API communication or PDF generation
    if (
      axios.isAxiosError(
        error
      )
    ) {
      console.error(
        "Axios error:",
        error.message
      );
    } else {
      console.error(
        "Unexpected error:",
        error
      );
    }

    // Return an error response
    return NextResponse.json(
      {
        error:
          "Failed to generate the PDF",
      },
      {
        status: 500,
      }
    );
  }
}
