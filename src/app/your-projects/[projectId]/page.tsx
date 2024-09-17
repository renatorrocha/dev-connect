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

  const { data, isLoading } = api.project.getById.useQuery({ projectId });
  const rehypePlugins = [rehypeSanitize];

  return (
    <>
      {isLoading ? (
        <Loader2 className="m-auto mt-32 size-8 animate-spin text-primary" />
      ) : (
        data && (
          <>
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-primary">
                    {data?.name}
                  </CardTitle>
                  <CardDescription>{data?.description}</CardDescription>
                </div>
                <Link
                  href={data?.repositoryLink}
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
                    source={data?.readme}
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
      )}
    </>
  );
}
