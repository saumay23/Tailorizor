import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

async function generatePDF(
  html: string
): Promise<Buffer> {
  try {
    const executablePath =
      await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
      );
    console.log(
      executablePath,
      "\n\n\n\n\n\n\n"
    );
    if (
      !executablePath
    )
      throw new Error(
        "Executable path error"
      );
    const browser =
      await puppeteer.launch(
        {
          executablePath,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
          ],
          headless:
            false,
        }
      );
    const page =
      await browser.newPage();

    // Set the provided HTML content
    await page.setContent(
      html,
      {
        waitUntil:
          "networkidle0",
      }
    );

    // Generate PDF
    const pdfData =
      await page.pdf(
        {
          format:
            "a4",
          width:
            "8.27in",
          height:
            "11.69in",
        }
      );

    // Close the browser
    await browser.close();
    const pdfBuffer =
      Buffer.from(
        pdfData
      );

    return pdfBuffer;
  } catch (error) {
    console.log(
      "Error generating PDF:",
      error
    );
    throw new Error(
      "Failed to generate PDF"
    );
  }
}

export async function POST(
  req: Request
) {
  const {
    html,
  } =
    await req.json();

  if (
    !html
  ) {
    return NextResponse.json(
      {
        error:
          "HTML content is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const pdfBuffer =
      await generatePDF(
        html
      );

    return new Response(
      pdfBuffer,
      {
        headers:
          {
            "Content-Type":
              "application/pdf",
            "Content-Disposition":
              "attachment; filename=generated.pdf",
          },
      }
    );
  } catch (error) {
    console.error(
      "Error generating PDF:",
      error
    );
    return NextResponse.json(
      {
        error: ` Failed to generate PDF ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
