"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/modeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const NavLinks = [
  { label: "Home", href: "/" },
  { label: "Create Word", href: "/new-word" },
  { label: "My Words", href: "/my-words" },
  { label: "Browse Words", href: "/words" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="py-5 fixed z-50 w-full bg-background">
      <div className="flex max-w-7xl mx-auto px-5 items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <div className="md:flex hidden items-center gap-x-3">
          {NavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm text-muted-foreground hover:text-primary transition-colors",
                pathname === href && "text-primary font-semibold"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          <ModeToggle />

          <SignedOut>
            <div className="md:block hidden">
              <SignInButton mode="modal">
                <Button>Log In</Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <Sheet>
            <SheetTrigger className="md:hidden block">
              <Menu className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <Link href="/">
                  <Image src="/logo.png" alt="logo" width={50} height={50} />
                </Link>
              </SheetHeader>
              <div className="flex flex-col items-start gap-y-3 my-10">
                {NavLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "text-sm text-muted-foreground hover:text-primary transition-colors",
                      pathname === href && "text-primary font-semibold"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button>Log In</Button>
                </SignInButton>
              </SignedOut>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
