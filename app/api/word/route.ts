import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 500 });
  }

  const body = await req.json();

  const newWord = await prisma.word.create({
    data: { ...body },
  });

  return NextResponse.json(newWord, { status: 201 });
}
