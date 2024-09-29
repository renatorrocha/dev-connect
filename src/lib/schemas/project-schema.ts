import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  readme: z.string().min(1, "Readme is required."),
  techStack: z.enum(["FRONTEND", "BACKEND", "FULLSTACK"]),
  repositoryLink: z.string().url(),
  createdByUserId: z.string().cuid(),
});

export type IProjectSchema = z.infer<typeof ProjectSchema>;
