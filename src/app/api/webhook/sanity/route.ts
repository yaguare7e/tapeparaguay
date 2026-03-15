import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { _type, slug } = body;

    // Revalidate relevant paths based on document type
    switch (_type) {
      case "tour":
        revalidatePath("/[locale]/tours", "page");
        revalidatePath("/[locale]/adventure", "page");
        revalidatePath("/[locale]/culture", "page");
        revalidatePath("/[locale]/invest", "page");
        revalidatePath("/[locale]/leisure", "page");
        if (slug?.current) {
          revalidatePath(`/[locale]/tours/${slug.current}`, "page");
        }
        break;
      case "destination":
        revalidatePath("/[locale]/destinations", "page");
        if (slug?.current) {
          revalidatePath(`/[locale]/destinations/${slug.current}`, "page");
        }
        break;
      case "blogPost":
        revalidatePath("/[locale]/blog", "page");
        if (slug?.current) {
          revalidatePath(`/[locale]/blog/${slug.current}`, "page");
        }
        break;
      case "testimonial":
        revalidatePath("/[locale]/testimonials", "page");
        break;
      case "faq":
        revalidatePath("/[locale]/faq", "page");
        break;
      default:
        // Revalidate homepage for any content change
        revalidatePath("/[locale]", "page");
    }

    return NextResponse.json(
      { revalidated: true, type: _type },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
