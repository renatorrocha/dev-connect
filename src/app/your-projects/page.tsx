"use client";

import { Import } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function YourProjects() {
  return (
    <div className="flex flex-col border">
      <div className="self-end">
        <Button>
          <Import className="mr-2 h-4 w-4" />
          Import Project
        </Button>
      </div>
    </div>
  );
}
