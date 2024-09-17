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
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg text-primary">
                {project?.name}
              </CardTitle>
              <CardDescription>{project?.description}</CardDescription>
            </div>
            <Link
              href={project?.repositoryLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              View Project <ExternalLink className="ml-2 size-4" />
            </Link>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-primary">README</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-none">
              <MarkdownPreview
                source={project?.readme}
                style={{ padding: "4rem" }}
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
