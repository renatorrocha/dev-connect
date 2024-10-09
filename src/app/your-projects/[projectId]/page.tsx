/* eslint-disable react-hooks/rules-of-hooks */
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
import { Button } from "~/components/ui/button";
import { CodeIcon, Edit, GitBranchIcon, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function yourProjectId({
  params: { projectId },
}: SearchParamProps) {
  const { data: session } = useSession();
  if (!projectId) return null;
  const rehypePlugins = [rehypeSanitize];
  const apiContext = api.useContext();
  const router = useRouter();
  const { mutate: deleteProject, isPending } = api.project.delete.useMutation({
    onSuccess: async () => {
      await apiContext.project.getAllByUserId.invalidate();
      toast.warning("Project Deleted !");
      router.push("/your-projects");
    },
  });
  const {
    data: project,
    isLoading,
    isError,
  } = api.project.getById.useQuery({
    projectId,
    userId: session?.user.id,
  });

  if (isLoading || !session) {
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
        <div className="space-y-8">
          <Card>
            <CardHeader className="flex flex-col space-y-4">
              <div>
                <CardTitle className="text-2xl font-bold capitalize text-primary">
                  {project.name}
                </CardTitle>
                <CardDescription className="mt-2">
                  {project.description}
                </CardDescription>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <Link
                    href={project.repositoryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranchIcon className="mr-2 h-4 w-4" />
                    View Repository
                  </Link>
                </Button>

                <div className="flex w-full gap-4 sm:w-auto">
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="flex-1 sm:flex-initial"
                  >
                    <Link href={`/your-projects/${project.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 sm:flex-initial"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your project and remove all of its data from
                          our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteProject({
                              projectId: project.id,
                              userId: session?.user.id,
                            });
                          }}
                          className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                          {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex w-full items-center justify-between">
                <p className="text-xl font-semibold text-primary">Readme</p>

                <Badge variant="secondary" className="lowercase">
                  <CodeIcon className="mr-2 h-3 w-3" />
                  {project.projectType}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <MarkdownPreview
                  source={project.readme}
                  rehypePlugins={rehypePlugins}
                  wrapperElement={{
                    "data-color-mode": "light",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  );
}
