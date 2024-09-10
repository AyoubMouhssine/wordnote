"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Trash, Loader } from "lucide-react";
import { Word } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  word: Word;
}

const Delete = ({ word }: Props) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const handleDelete = async () => {
    try {
      if (
        !confirm(
          "Are you sure you want to delete this word? This action cannot be undone."
        )
      ) {
        return;
      }

      const res = await axios.delete(`/api/word/${word.id}`);

      if (res.status === 201) {
        toast("Story is deleted");
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
  const router = useRouter();

  return (
    <Button
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
  );
};

export default Delete;
