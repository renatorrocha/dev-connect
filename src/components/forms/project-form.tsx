"use client";

import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
import { TECHSTACKS } from "~/lib/constants";

interface IProjectForm {
  mutationFn: (data: IProjectSchema) => void;
  isPending: boolean;
  userId: string;
}

export default function ProjectForm({
  mutationFn,
  isPending,
  userId,
}: IProjectForm) {
  const form = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      repositoryLink: "",
      readme: "",
      techStack: "" as TechStack,
      createdByUserId: userId,
      image: null,
    },
  });

  console.log(form.formState.errors);

  async function onSubmit(data: IProjectSchema) {
    mutationFn(data);
    // console.log(data);
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
            name="techStack"
            label="Tech Stack Selection"
            placeholder="Choose the tech stack"
          >
            {TECHSTACKS.map((techStack) => (
              <SelectItem key={techStack.label} value={techStack.value}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{techStack.label}</p>
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
            href={"/your-projects"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>

          <Button type="submit" disabled={isPending} className="items-center">
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <p>Creating...</p>
              </>
            ) : (
              <p>Create Project</p>
            )}
          </Button>
        </footer>
      </form>
    </Form>
  );
}
