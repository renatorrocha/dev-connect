"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectForm from "~/components/forms/project-form";
import { api } from "~/trpc/react";

export default function NewProject() {
  const { data } = useSession();
  const userId = data?.user.id ?? "";
  const router = useRouter();
  const apiContext = api.useContext();
  const { mutate: createProject, isPending } = api.project.create.useMutation({
    onSuccess: async () => {
      await apiContext.project.getAllProjectsByUserId.invalidate();
      router.push("/your-projects");
    },
  });
  return (
    <div>
      <h1 className="font-bold text-primary">Create a new Project</h1>

      <ProjectForm
        mutationFn={createProject}
        isPending={isPending}
        userId={userId}
      />
    </div>
  );
}
