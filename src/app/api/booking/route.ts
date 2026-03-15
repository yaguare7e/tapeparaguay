import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceClient } from "@/lib/supabase/server";
import {
  sendBookingNotification,
  sendBookingConfirmation,
} from "@/lib/email/brevo";

const bookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  groupSize: z.string().optional(),
  message: z.string().optional(),
  segment: z.string().optional(),
  tourSlug: z.string().optional(),
  tourTitle: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // ── Critical: persist to Supabase ──────────────────────────────
    const supabase = getServiceClient();
    const { error: dbError } = await supabase.from("bookings").insert({
      tour_slug: data.tourSlug ?? null,
      tour_title: data.tourTitle ?? null,
      segment: data.segment ?? null,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone ?? null,
      preferred_date: data.preferredDate ?? null,
      group_size: parseInt(data.groupSize || "1", 10),
      message: data.message ?? null,
    });

    if (dbError) {
      console.error("Supabase booking insert error:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save booking" },
        { status: 500 }
      );
    }

    // ── Non-critical: send email notifications ─────────────────────
    // Fire-and-forget — failures are logged but don't affect the response
    sendBookingNotification(data).catch(() => {});
    sendBookingConfirmation(data).catch(() => {});

    return NextResponse.json(
      { success: true, message: "Booking inquiry received" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
