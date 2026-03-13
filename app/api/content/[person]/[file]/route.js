import { NextResponse } from "next/server";
import { getPersonContent, getValidPersons } from "@/lib/content";

export async function GET(request, { params }) {
  const { person, file } = await params;

  if (!getValidPersons().includes(person)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const data = getPersonContent(person, file);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
