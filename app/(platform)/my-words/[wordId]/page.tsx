import React, { FormEvent, useState } from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import Edit from "./_components/Edit";
import Delete from "./_components/Delete";

const EditWordPage = async ({ params }: { params: { wordId: string } }) => {
  const { userId } = auth();
  if (!userId) return null;

  const word = await prisma.word.findUnique({
    where: {
      id: params.wordId,
      user_id: userId,
    },
  });

  if (!word) redirect("/my-words");

  return (
    <>
      <Edit word={word} />
    </>
  );
};

export default EditWordPage;
