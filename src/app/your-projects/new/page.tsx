"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectForm from "~/components/forms/project-form";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";

export default function NewProject() {
  const { data } = useSession();
  const userId = data?.user.id;
  const router = useRouter();
  const apiContext = api.useContext();
  const { mutate: createProject, isPending } = api.project.create.useMutation({
    onSuccess: async () => {
      await apiContext.project.getAllByUserId.invalidate();
      router.push("/your-projects");
    },
  });

  if (!userId)
    return (
      <Loader2 className="m-auto mt-32 size-8 animate-spin text-primary" />
    );

  return (
    <div>
      <h1 className="font-bold text-primary">Create a new Project</h1>

      <Separator className="my-3" />

      <ProjectForm
        mutationFn={createProject}
        isPending={isPending}
        userId={userId}
      />
    </div>
  );
}
