"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CalendarDaysIcon, CodeIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Project } from "@prisma/client";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useSession } from "next-auth/react";

export default function PreviewProjectCard({ project }: { project: Project }) {
  const { data: session } = useSession();
  const isProjectOwner = session?.user.id == project.createdByUserId;
  const createdDateRelativeToNow = formatDistanceToNow(project.createdAt, {
    addSuffix: true,
  });

  return (
    <Card
      key={project.id}
      className="shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* //todo: add project img  */}
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
        <CardTitle className="flex items-center justify-between">
          <p className="w-36 truncate">{project.name}</p>

          <div className="gap-2">
            <Badge variant="secondary" className="lowercase">
              <CodeIcon className="mr-2 h-4 w-4" />
              {project.projectType}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between p-4">
        <Link
          href={
            isProjectOwner
              ? `/your-projects/${project.id}`
              : `/discover/${project.id}`
          }
          className={buttonVariants()}
          prefetch={false}
        >
          View Project
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDaysIcon className="size-4" />
          <p>{createdDateRelativeToNow}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
