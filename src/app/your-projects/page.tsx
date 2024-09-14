"use client";

import { Import } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";

export default function YourProjects() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="flex flex-col border">
      {/* <div className="self-end">
        <Button>
          <Import className="mr-2 h-4 w-4" />
          Import Project
        </Button>
      </div> */}
      <pre>{session?.user.username}</pre>
      <pre>{session?.user.name}</pre>
    </div>
  );
}
