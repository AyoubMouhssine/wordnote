"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export const languages = [
  { short: "ar", language: "Arabic" },
  { short: "en", language: "English" },
  { short: "es", language: "Spanish" },
  { short: "fr", language: "French" },
];
const NewWordPage = () => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmiting(true);
      toast("Word is creating...");

      const res = await axios.post("/api/word", {
        word,
        description,
        language,
        user_id: userId,
      });

      if (res.status === 201) {
        toast("Word is Created", {
          className: "bg-emerald-500 text-white",
        });
        router.push("/my-words");
        router.refresh();
      }
      console.log(res);
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Word</h1>
      <form onSubmit={handleSubmit} method="post" className="space-y-6">
        <div>
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Word
          </label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a language</option>
            {languages.map(({ short, language }) => (
              <option key={short} value={short}>
                {language.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="definition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Definition
          </label>
          <textarea
            id="definition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter definition"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <Button
            disabled={isSubmiting}
            type="submit"
            className="w-full
            sm:w-auto
            px-6
            py-3
            bg-indigo-600
            text-white
            font-medium
            rounded-md
            shadow-sm
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
            transition
            duration-150
            ease-in-out
            "
          >
            {isSubmiting && <Loader className="mr-2 w-5 h-5 animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewWordPage;
