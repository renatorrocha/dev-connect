"use client";

import { useRouter } from "next/navigation";
import ProjectForm from "~/components/forms/project-form";
import { api } from "~/trpc/react";

export default function NewProject() {
  const router = useRouter();
  const { mutate: createProject, isPending } = api.project.create.useMutation({
    onSuccess: () => {
      router.push("/your-projects");
    },
  });
  return (
    <div>
      <h1 className="font-bold text-primary">Create a new Project</h1>

      <ProjectForm mutationFn={createProject} isPending={isPending} />
    </div>
  );
}
