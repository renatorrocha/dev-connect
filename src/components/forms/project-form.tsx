"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "~/components/custom-form-field";
import { Button, buttonVariants } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { FormFieldTypes } from "~/lib/types/form-field-types";
import {
  type IProjectSchema,
  ProjectSchema,
} from "~/lib/schemas/project-schema";
import { Loader2 } from "lucide-react";
import { SelectItem } from "../ui/select";
import type { Project, ProjectType } from "@prisma/client";
import { PROJECTTYPES } from "~/lib/constants";

interface IProjectForm {
  mutationFn: (data: IProjectSchema) => void;
  isPending: boolean;
  project?: Project;
  userId: string;
}

export default function ProjectForm({
  mutationFn,
  isPending,
  project,
  userId,
}: IProjectForm) {
  const form = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      repositoryLink: project?.repositoryLink ?? "",
      readme: project?.readme ?? "",
      projectType: project?.projectType ?? ("" as ProjectType),
      id: project?.id ?? undefined,
      createdByUserId: userId,
    },
  });

  async function onSubmit(data: IProjectSchema) {
    mutationFn(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldTypes.input}
            control={form.control}
            name="name"
            label="Project Name"
            placeholder="Enter the name of your project"
          />

          <CustomFormField
            fieldType={FormFieldTypes.input}
            control={form.control}
            name="description"
            label="Project Description"
            placeholder="Briefly describe your project"
          />

          <CustomFormField
            fieldType={FormFieldTypes.input}
            control={form.control}
            name="repositoryLink"
            label="Repository Link"
            placeholder="Enter the URL of the repository"
          />

          <CustomFormField
            fieldType={FormFieldTypes.select}
            control={form.control}
            name="projectType"
            label="Project Type Selection"
            placeholder="Choose the Project Type"
          >
            {PROJECTTYPES.map((projectType) => (
              <SelectItem key={projectType.label} value={projectType.value}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{projectType.label}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <CustomFormField
          fieldType={FormFieldTypes.textArea}
          control={form.control}
          name="readme"
          label="Readme"
          placeholder="Write your project documentation here"
          description="* Supports markdown formatting"
        />

        <footer className="flex justify-center gap-4">
          <Link
            href={project ? `/your-projects/${project.id}` : "/your-projects"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>

          <Button type="submit" disabled={isPending} className="items-center">
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <p>{project ? "Updating..." : "Creating..."}</p>
              </>
            ) : (
              <p>{project ? "Edit Project" : "Create Project"}</p>
            )}
          </Button>
        </footer>
      </form>
    </Form>
  );
}
