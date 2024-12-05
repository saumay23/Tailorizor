import { NextResponse } from "next/server";
import { chromium } from "playwright-core";

async function generatePDF(
  html: string
): Promise<Buffer> {
  try {
    const browser =
      await chromium.launch(
        {
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
          ],
          headless:
            true,
        }
      );
    const page =
      await browser.newPage();

    // Set the provided HTML content
    await page.setContent(
      html,
      {
        waitUntil:
          "networkidle",
      }
    );

    // Generate PDF
    const pdfData =
      await page.pdf(
        {
          format:
            "A4",
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
