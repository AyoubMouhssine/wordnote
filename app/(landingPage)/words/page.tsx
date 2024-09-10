import React from "react";
import ListOfWords from "./components/ListOfWords";
import prisma from "@/prisma/db";

const WordsPage = async () => {
  const saves = await prisma.save.findMany();

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-8 pb-2 border-b">Words</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <ListOfWords saves={saves} />
      </div>
    </div>
  );
};

export default WordsPage;
