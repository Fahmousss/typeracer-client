// app/api/user-records/route.ts
import { NextResponse } from "next/server";
import { getTop3Record } from "@/app/lib/actions"; // Make sure this function exists

export async function GET() {
  try {
    const userRecords = await getTop3Record(); // Your logic to fetch records
    return NextResponse.json(userRecords);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch records" },
      { status: 500 }
    );
  }
}
