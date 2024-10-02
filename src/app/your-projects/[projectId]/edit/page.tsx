"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import ProjectForm from "~/components/forms/project-form";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";

export default function EditProjectPage({
  params: { projectId },
}: SearchParamProps) {
  const { data } = useSession();
  const userId = data?.user.id;
  const router = useRouter();
  if (!projectId) return null;
  const apiContext = api.useContext();
  const { data: project } = api.project.getById.useQuery({ projectId });
  const { mutate: updateProject, isPending } = api.project.update.useMutation({
    onSuccess: async () => {
      await apiContext.project.getAllByUserId.invalidate();
      await apiContext.project.getById.invalidate();
      router.push(`/your-projects/${projectId}`);
    },
  });

  if (!userId || !project)
    return (
      <Loader2 className="m-auto mt-32 size-8 animate-spin text-primary" />
    );

  return (
    <div>
      <h1 className="font-bold text-primary">Edit Project</h1>

      <Separator className="my-3" />

      <ProjectForm
        project={project}
        mutationFn={updateProject}
        isPending={isPending}
        userId={userId}
      />
    </div>
  );
}
