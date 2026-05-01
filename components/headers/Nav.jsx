"use client";
import { navLinks } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((item) => (
        <li
          key={item.href}
          className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "current-menu" : ""}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </>
  );
}
