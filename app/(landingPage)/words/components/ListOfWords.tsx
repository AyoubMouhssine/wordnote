"use client";
import { languages } from "@/app/(platform)/new-word/page";
import FilterByLanguage from "./FilterByLanguage";
import SingleWord from "./SingleWord";
import { Save, Word } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const ListOfWords = ({ saves }: { saves: Save[] }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isSignedIn } = useAuth();
  const handleFilter = async (lang: string) => {
    try {
      setIsLoading(true);
      const words = await axios.get(`/api/word/filter?language=${lang}`);
      setWords(words.data);
    } catch (error) {
      console.log("Error while fetching words from server " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchWords = async () => {
      try {
        const res = await axios.get("/api/word/filter");
        setWords(res.data);
      } catch (e) {
        console.log("Error while fetching words from the server: " + e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWords();
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-64 font-bold text-2xl text-center w-full">
        Please log in to view the words.
      </div>
    );
  }

  return (
    <>
      <div className="md:w-1/4 lg:w-1/5">
        <FilterByLanguage languages={languages} handleFilter={handleFilter} />
      </div>
      <div className="md:w-3/4 lg:w-4/5">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"></div>
          </div>
        ) : words.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {words.map((word) => (
              <SingleWord key={word.id} word={word} saves={saves} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 font-bold text-2xl">
            No words found.
          </div>
        )}
      </div>
    </>
  );
};

export default ListOfWords;
