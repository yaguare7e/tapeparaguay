import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceClient } from "@/lib/supabase/server";
import { addNewsletterSubscriber } from "@/lib/email/brevo";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    // ── Critical: upsert into Supabase (idempotent by email) ──────
    const supabase = getServiceClient();
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        { email: data.email, active: true },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Supabase newsletter upsert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to subscribe" },
        { status: 500 }
      );
    }

    // ── Non-critical: add to Brevo contacts ────────────────────────
    addNewsletterSubscriber(data.email).catch(() => {});

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
