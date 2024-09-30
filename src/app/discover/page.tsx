"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import PreviewProjectCard from "~/components/preview-project-card";
import { api } from "~/trpc/react";

export default function DiscoverPage() {
  const { data: projects, isLoading } = api.project.getAll.useQuery();

  return (
    <div className="container mt-10 max-w-6xl px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Discover New Projects
        </h1>

        <p className="text-muted-foreground">Discover exciting projects.</p>
      </div>

      {/* <div className="mb-8 grid gap-6 md:grid-cols-2">
      <div>
          <Label htmlFor="name-filter">Filter by Name</Label>
          <Input
            id="name-filter"
            placeholder="Enter project name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tech-stack-filter">Filter by Tech Stack</Label>
          <Select onValueChange={setTechStackFilter} value={techStackFilter}>
            <SelectTrigger id="tech-stack-filter">
              <SelectValue placeholder="Select Tech Stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="fullstack">Full Stack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

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
