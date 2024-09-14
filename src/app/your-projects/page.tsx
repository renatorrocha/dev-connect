"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { buttonVariants } from "~/components/ui/button";

import Link from "next/link";

export default function YourProjects() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="flex h-screen flex-col border">
      <Link href="/your-projects/new" className={buttonVariants()}>
        Create Project
      </Link>
    </div>
  );
}
