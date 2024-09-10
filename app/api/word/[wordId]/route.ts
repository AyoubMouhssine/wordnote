import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    wordId: string;
  };
};
export async function PATCH(req: NextRequest, { params }: Params) {
  const { userId } = auth();

  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const existingWord = await prisma.word.findUnique({
    where: {
      id: params.wordId,
    },
  });

  if (!existingWord)
    return NextResponse.json("Word not found", { status: 404 });

  const body = await req.json();

  const updatedStory = await prisma.word.update({
    where: {
      id: params.wordId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedStory, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { userId } = auth();

  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const existingWord = await prisma.word.findUnique({
    where: {
      id: params.wordId,
      user_id: userId,
    },
  });
  if (!existingWord)
    return NextResponse.json("Word not found", { status: 404 });

  const deletedWord = await prisma.word.delete({
    where: {
      id: params.wordId,
    },
  });

  return NextResponse.json(deletedWord, {
    status: 201,
  });
}
