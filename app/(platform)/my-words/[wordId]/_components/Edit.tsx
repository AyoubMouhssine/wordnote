"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { languages } from "@/app/(platform)/new-word/page";
import { Loader, Trash } from "lucide-react";
import { Word } from "@prisma/client";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  word: Word;
};
const Edit = (props: Props) => {
  const [word, setWord] = useState(props.word.word);
  const [description, setDescription] = useState(props.word.description);
  const [language, setLanguage] = useState(props.word.language);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      if (
        !confirm(
          "Are you sure you want to delete this word? This action cannot be undone."
        )
      ) {
        return;
      }
      setIsDeleting(true);
      toast("Word is deleting...");

      const res = await axios.delete(`/api/word/${props.word.id}`);

      if (res.status === 201) {
        toast("Word is deleted");

        router.push("/my-words");
        router.refresh();
      }
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmiting(true);
      toast("Story is updating...");

      const res = await axios.patch(`/api/word/${props.word.id}`, {
        word,
        description,
        language,
      });

      if (res.status === 201) {
        toast("Word is Updated", {
          className: "bg-emerald-500 text-white",
        });
        router.push("/my-words");
        router.refresh();
      }
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Word</h1>
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
          <div className="flex justify-between items-center">
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
              Edit
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              variant={"destructive"}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <Loader className="md:mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Trash className="h-5 w-5 md:mr-2" />
              )}
              <span className="md:block hidden">Delete</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
