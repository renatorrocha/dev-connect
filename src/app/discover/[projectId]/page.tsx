"use client";

import { api } from "~/trpc/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { buttonVariants } from "~/components/ui/button";
import { CodeIcon, GitBranchIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";

export default function DiscoverProjectIdPage({
  params: { projectId },
}: SearchParamProps) {
  if (!projectId) return null;
  const rehypePlugins = [rehypeSanitize];

  const {
    data: project,
    isLoading,
    isError,
  } = api.project.getById.useQuery({
    projectId,
  });

  if (isLoading) {
    return (
      <Loader2 className="m-auto mt-32 size-8 animate-spin text-primary" />
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-32 w-fit rounded-xl border bg-card p-8 text-center text-xl text-destructive shadow">
        Project not found.
      </div>
    );
  }
  console.log(project);
  return (
    project && (
      <div className="container mt-10 max-w-6xl px-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold capitalize text-primary">
                {project.name}
              </CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </div>
            <Link
              href={project.repositoryLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              <GitBranchIcon className="mr-2 h-4 w-4" />
              View Repository
            </Link>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex w-full items-center justify-between">
              <p className="text-xl font-semibold text-primary">Readme</p>

              <div className="gap-2">
                <Badge variant="secondary" className="lowercase">
                  <CodeIcon className="mr-2 h-3 w-3" />
                  {project.projectType}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-2">
            <div className="max-w-none">
              <MarkdownPreview
                source={project.readme}
                style={{ padding: "2rem" }}
                rehypePlugins={rehypePlugins}
                wrapperElement={{
                  "data-color-mode": "light",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  );
}
