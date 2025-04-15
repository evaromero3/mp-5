import { NextResponse } from "next/server";
import { createNewLink } from "@/lib/createNewLink";

export async function POST(request: Request) {
  try {
    const { originalURL, alias } = await request.json();
    const newLink = await createNewLink(alias, originalURL);
    if ("error" in newLink) {
      return NextResponse.json({ error: newLink.error }, { status: 400 });
    }
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/links:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
