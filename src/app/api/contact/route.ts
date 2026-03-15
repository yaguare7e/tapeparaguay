import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email/brevo";

const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // ── Critical: persist to Supabase ──────────────────────────────
    const supabase = getServiceClient();
    const { error: dbError } = await supabase.from("contacts").insert({
      full_name: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (dbError) {
      console.error("Supabase contact insert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save contact message" },
        { status: 500 }
      );
    }

    // ── Non-critical: send email notification ──────────────────────
    sendContactNotification(data).catch(() => {});

    return NextResponse.json(
      { success: true, message: "Contact message received" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
