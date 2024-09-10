"use client";
import React from "react";
import { Save, Word } from "@prisma/client";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
const SingleWord = ({ word, saves }: { word: Word; saves: Save[] }) => {
  const router = useRouter();
  const { userId } = useAuth();
  if (!userId) return null;

  const save = saves.find((s) => s.wordId === word.id);

  const handleSave = async () => {
    try {
      const res = await axios.post("/api/save", {
        wordId: word.id,
        userId,
      });

      if (res.status === 201) {
        router.refresh();
        toast("Word is saved");
      }
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">{word.word}</h2>
        {!save ? (
          <Button variant={"ghost"} onClick={handleSave}>
            <Heart />
          </Button>
        ) : (
          <Button variant={"ghost"}>
            <Heart className="text-rose-500" />
          </Button>
        )}
      </div>
      <p className="text-gray-600 mb-2">{word.description}</p>
      <p className="text-sm text-gray-500">Language: {word.language}</p>
    </div>
  );
};

export default SingleWord;
