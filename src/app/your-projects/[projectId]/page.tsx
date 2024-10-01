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
import { CodeIcon, Edit, GitBranchIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";

export default function yourProjectId({
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

  return (
    project && (
      <>
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

            <div className="flex gap-4">
              <Link
                href={project.repositoryLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "sm" })}
              >
                <GitBranchIcon className="mr-2 h-4 w-4" />
                View Repository
              </Link>

              <Link
                href={`/your-projects/${project.id}/edit`}
                className={buttonVariants({ size: "sm", variant: "secondary" })}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </Link>
            </div>
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

          <CardContent className="p-4">
            <div className="max-w-none border border-gray-100">
              <MarkdownPreview
                source={project.readme}
                style={{ padding: "2rem", borderRadius: "24px" }}
                rehypePlugins={rehypePlugins}
                wrapperElement={{
                  "data-color-mode": "light",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </>
    )
  );
}
