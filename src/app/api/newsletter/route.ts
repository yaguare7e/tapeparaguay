import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    // TODO: Insert into Supabase when configured
    // TODO: Add to Brevo contact list via API

    console.log("New newsletter subscription:", data.email);

    return NextResponse.json(
      { success: true, message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
