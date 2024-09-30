"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import PreviewProjectCard from "~/components/preview-project-card";
import { Loader2 } from "lucide-react";

export default function YourProjects() {
  const { data } = useSession();
  const { data: projectsArray, isLoading } =
    api.project.getAllByUserId.useQuery({
      userId: data?.user.id ?? "",
    });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Your Projects</h1>
          <p className="text-muted-foreground">
            View and manage all the projects you&apos;ve submitted to the
            platform.
          </p>
        </div>
        <Link href="/your-projects/new" className={buttonVariants()}>
          Create Project
        </Link>
      </div>

      {isLoading ? (
        <Loader2 className="m-auto mt-32 size-8 animate-spin text-primary" />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsArray?.map((project) => (
            <PreviewProjectCard project={project} key={project.id} />
          ))}
        </div>
      )}
    </div>
  );
}
