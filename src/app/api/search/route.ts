import { NextRequest, NextResponse } from "next/server";

// TODO: Replace with Sanity GROQ search when CMS is connected
// import { client } from "@sanity/lib/client";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const locale = request.nextUrl.searchParams.get("locale") || "es";

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // TODO: Implement Sanity GROQ search
  // const results = await client.fetch(`
  //   *[
  //     _type in ["tour", "destination", "blogPost"] &&
  //     (title[$locale] match $query + "*" || shortDescription[$locale] match $query + "*")
  //   ][0..9] {
  //     _type,
  //     "title": title[$locale],
  //     "slug": slug.current,
  //     "excerpt": shortDescription[$locale],
  //     "segment": segment
  //   }
  // `, { query, locale });

  return NextResponse.json({ results: [] });
}
