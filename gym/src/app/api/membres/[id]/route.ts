import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const res = await fetch(`${DATA_SOURCE_URL}/${id}`);

  const member: Member[] = await res.json();

  if (!member.id) return NextResponse.json({ message: "Member not found" });
  return NextResponse.json(member);
}
