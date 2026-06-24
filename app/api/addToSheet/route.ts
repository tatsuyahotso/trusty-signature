import {
  addToSheet,
  type SheetSubmission,
} from "@/utils/google-sheets-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as SheetSubmission;

    await addToSheet(data);

    return NextResponse.json(
      { message: "Data added successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding data:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An error occurred.",
      },
      { status: 500 },
    );
  }
}
