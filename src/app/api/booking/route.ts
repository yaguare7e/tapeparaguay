import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

    // TODO: Insert into Supabase when configured
    // const { error } = await supabase.from("bookings").insert({
    //   tour_slug: data.tourSlug,
    //   tour_title: data.tourTitle,
    //   segment: data.segment,
    //   full_name: data.fullName,
    //   email: data.email,
    //   phone: data.phone,
    //   preferred_date: data.preferredDate,
    //   group_size: parseInt(data.groupSize || "1"),
    //   message: data.message,
    // });

    // TODO: Send email notification via Brevo when configured
    // await sendBookingNotification(data);
    // await sendBookingConfirmation(data);

    console.log("New booking inquiry:", data);

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
