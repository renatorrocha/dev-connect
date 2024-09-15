"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CalendarDaysIcon } from "lucide-react";

export default function YourProjects() {
  const { data } = useSession();
  const { data: projectsArray } = api.project.getAllProjectsByUserId.useQuery({
    userId: data?.user.id,
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsArray?.map((project) => (
          <Card key={project.id}>
            {/* //todo: implementar foto do projeto  */}
            {/* <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Project Thumbnail"
                width={400}
                height={225}
                className="aspect-video w-full object-cover"
              />
            </CardContent> */}

            <CardHeader className="p-4">
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex items-center justify-between p-4">
              <Link
                href={`/projects/${project.id}`}
                className={buttonVariants()}
                prefetch={false}
              >
                View Project
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDaysIcon className="size-4" />
                <p>{new Date(project.createdAt).toLocaleDateString()}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
