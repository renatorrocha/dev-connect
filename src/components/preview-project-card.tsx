import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CalendarDaysIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Project } from "@prisma/client";
import { buttonVariants } from "./ui/button";
import Link from 'next/link';

export default function PreviewProjectCard({ project }: { project: Project }) {
  const createdDateRelativeToNow = formatDistanceToNow(project.createdAt, {
    addSuffix: true,
  });

  return (
    <Card key={project.id}>
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
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between p-4">
        <Link
          href={`/your-projects/${project.id}`}
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
