"use client";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { links } from "./Sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          WordNote
        </h1>
        <div className="flex items-center gap-x-2">
          <ModeToggle />
          <SignedOut>
            <div className="hidden sm:block">
              <SignInButton mode="modal">
                <Button>Log In</Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <Sheet>
            <SheetTrigger className="sm:hidden block">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <Link href="/">
                  <Image src="/logo.png" alt="logo" width={50} height={50} />
                </Link>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li>
                      <Link
                        href={href}
                        className={cn(
                          "block py-2 px-4 hover:bg-gray-700 rounded",
                          pathName === href &&
                            "bg-gray-700 text-orange-400 font-medium"
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <SignedOut>
                <div className="mt-6">
                  <SignInButton mode="modal">
                    <Button className="w-full">Log In</Button>
                  </SignInButton>
                </div>
              </SignedOut>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
