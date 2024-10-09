"use client";

import { ProjectType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import PreviewProjectCard from "~/components/preview-project-card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useDebounce } from "~/lib/hooks/use-debounce";
import { api } from "~/trpc/react";

export default function DiscoverPage() {
  const [nameFilter, setNameFilter] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState<
    ProjectType | "ALL"
  >("ALL");
  const debouncedNameFilter = useDebounce(nameFilter, 500);
  const { data: projects, isLoading } = api.project.getAll.useQuery({
    name: debouncedNameFilter,
    projectType: projectTypeFilter === "ALL" ? undefined : projectTypeFilter,
  });

  return (
    <div className="container mt-10 max-w-6xl px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Discover New Projects
        </h1>

        <p className="text-muted-foreground">Discover exciting projects.</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="name-filter">Filter by Project Name</Label>
          <Input
            id="name-filter"
            placeholder="Enter project name"
            className="h-11 rounded-md border bg-white shadow-md placeholder:border-zinc-400 placeholder:text-zinc-500"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tech-stack-filter">Filter by Project Type</Label>
          <Select
            onValueChange={(value) =>
              setProjectTypeFilter(value as ProjectType | "ALL")
            }
            value={projectTypeFilter}
          >
            <SelectTrigger className="h-11 bg-white shadow-md focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue
                placeholder="Select Project Type"
                className="placeholder:text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="FRONTEND">Frontend</SelectItem>
              <SelectItem value="BACKEND">Backend</SelectItem>
              <SelectItem value="FULLSTACK">Full Stack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <Loader2 className="m-auto mt-32 size-8 animate-spin text-primary" />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <PreviewProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {projects?.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No projects found.</p>
      )}
    </div>
  );
}
