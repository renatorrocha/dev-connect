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
import { api } from "~/trpc/react";
import { uploadImage } from "~/server/upload";

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
      createdByUserId: userId,
      image: null,
    },
  });

  console.log(form.formState.errors);

  async function onSubmit(data: IProjectSchema) {
    if (data.image) {
      const imageUrl = await uploadImage(data.image);
      // data.imageUrl = imageUrl;
      console.log(imageUrl);
    }
    // mutationFn(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldTypes.input}
            control={form.control}
            name="name"
            label="Name"
            placeholder="Project name"
          />

          <CustomFormField
            fieldType={FormFieldTypes.input}
            control={form.control}
            name="description"
            label="Description"
            placeholder="Project Description"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldTypes.input}
          control={form.control}
          name="repositoryLink"
          label="Link to Repository"
          placeholder="Repository link"
        />

        <Controller
          name="image"
          control={form.control}
          render={({ field: { onChange } }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onChange(e.target.files[0]); // Passa o arquivo para o react-hook-form
                }
              }}
              className="rounded-md border p-2"
            />
          )}
        />

        {/* //todo: add techs tags */}
        <CustomFormField
          fieldType={FormFieldTypes.textArea}
          control={form.control}
          name="readme"
          label="Readme"
          placeholder="Project Readme"
          description="Accept markdown"
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
