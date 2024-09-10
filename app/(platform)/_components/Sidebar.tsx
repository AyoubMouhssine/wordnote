"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Words", href: "/my-words" },
  { label: "New Word", href: "/new-word" },
  { label: "Saved Words", href: "/saved-words" },
];

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <div className="hidden sm:block w-64 bg-gray-800 text-white p-6">
      <nav>
        <ul className="space-y-2">
          {links.map(({ label, href }) => (
            <li>
              <Link
                href={href}
                className={cn(
                  "block py-2 px-4 hover:bg-gray-700 rounded",
                  pathName === href && "bg-gray-700 text-orange-400 font-medium"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
