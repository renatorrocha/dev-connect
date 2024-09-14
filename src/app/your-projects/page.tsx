"use client";

import { Import, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function YourProjects() {
  const { data: session } = useSession();

  // const { data: repos, isLoading } = api.project.getRepos.useQuery({
  //   username: session?.user.username ?? " ",
  // });
  // console.log(repos);

  return (
    <div className="flex h-screen flex-col border">
      <div className="self-end">
        <Button>
          <Import className="mr-2 h-4 w-4" />
          Import Project
        </Button>

        {/* {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="flex flex-col">
            {repos.map((repo) => (
              <p className="text-black">{repo.name}</p>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
