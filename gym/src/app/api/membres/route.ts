import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "";

const API_KEY: string = process.env.DATA_API_KEY as string;
export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const members: Member[] = await res.json();

  return NextResponse.json(members);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Member> = await request.json();

  if (!id) return NextResponse.json({ message: "Member id required" });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "API-Key": API_KEY,
    },
  });
  return NextResponse.json({ message: `Todo ${id} deleted` });
}

export async function POST(request: Request) {
  const { userId, name }: Partial<Member> = await request.json();

  if (!userId || !name)
    return NextResponse.json({ message: "Name and id required" });

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      userId,
      name,
      active: false,
    }),
  });
  const newMember: Member = await res.json();
  return NextResponse.json({ message: `New member added` });
}

export async function PUT(request: Request) {
  const { id, userId, name, active }: Member = await request.json();

  if (!id || !userId || !name || typeof active !== "boolean")
    return NextResponse.json({ message: "Missing required data" });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      userId,
      name,
      active,
    }),
  });
  const updatedMember: Member = await res.json();
  return NextResponse.json(updatedMember);
}
