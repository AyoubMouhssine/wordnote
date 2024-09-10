"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome to WordNote, {user?.fullName}!
      </h1>
      <p className="text-lg sm:text-xl mb-8 text-gray-700 dark:text-gray-300">
        Start expanding your vocabulary today.
      </p>
      <div className="space-y-4 w-full max-w-xs">
        <Link
          href="/new-word"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded block text-center transition duration-300 ease-in-out"
        >
          Add Your First Word
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
