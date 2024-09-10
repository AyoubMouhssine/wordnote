import React from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/db";

import { Separator } from "@/components/ui/separator";
import RemoveSave from "./__components/removeSave";
const SavesPage = async () => {
  const { userId } = auth();

  const saves = await prisma.save.findMany({
    where: {
      userId: userId!,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      word: true,
    },
  });

  return (
    <div className="flex flex-col space-y-5 w-full">
      <h1 className=" font-semibold">My saves</h1>
      <Separator />
      {saves.map(({ word, id }) => (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold mb-2">{word.word}</h2>
            <RemoveSave saveId={id} />
          </div>
          <p className="text-gray-600 mb-2">{word.description}</p>
          <p className="text-sm text-gray-500">Language: {word.language}</p>
        </div>
      ))}
    </div>
  );
};

export default SavesPage;
