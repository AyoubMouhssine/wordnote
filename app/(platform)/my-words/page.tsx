import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./_components/columns";

const myWordsPage = async () => {
  const { userId } = auth();

  const words = await prisma.word.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      user_id: userId!,
    },
  });

  return (
    <div className="flex flex-col space-y-5 w-full">
      <h1 className="font-semibold">My stories</h1>
      <Separator />
      <DataTable
        data={words}
        columns={columns}
        searchValue="word"
        placeholder="Search by word name..."
      />
    </div>
  );
};

export default myWordsPage;
