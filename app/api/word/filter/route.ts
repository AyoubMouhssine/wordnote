import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const language = req.nextUrl.searchParams.get("language");
  const words = language
    ? await prisma.word.findMany({
        where: {
          language: language as string,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prisma.word.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
  return NextResponse.json(words, {
    status: 200,
  });
}
