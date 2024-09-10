import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      className="flex
     flex-col items-center justify-center
      py-32 text-center space-y-3 min-h-full px-5"
    >
      <h2 className="text-sm font-medium">Welcome to WordNote</h2>
      <h1
        className="text-3xl md:text-5xl font-bold 
      max-w-2xl"
      >
        Discover, Save, and Share Inspiring Words
      </h1>
      <p className="max-w-lg text-muted-foreground">
        WordNote is a platform where you can discover new words, save them, and
        share your favorite words with others. Explore the beauty and power of
        language and build your personal word collection.
      </p>
      <div className="flex items-center gap-x-3">
        <Link href="/create-word">
          <Button>Save a Word</Button>
        </Link>
        <Link href="/words">
          <Button variant="outline">Browse Words</Button>
        </Link>
      </div>
      <Image src="/Notebook.svg" alt="write a word" width={500} height={500} />
    </section>
  );
};

export default Hero;
