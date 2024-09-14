"use client";

import ProjectForm from "~/components/forms/project-form";

export default function NewProject() {
  function handleCreateProject() {
    console.log("foi");
  }
  return (
    <div>
      <h1 className="font-bold text-primary">Create a new Project</h1>

      <ProjectForm mutationFn={handleCreateProject} />
    </div>
  );
}
