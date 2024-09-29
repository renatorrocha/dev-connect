import { z } from "zod";
import { ProjectSchema } from "~/lib/schemas/project-schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany();

    return projects ?? null;
  }),

  getById: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUniqueOrThrow({
        where: {
          id: input.projectId,
        },
        include: {
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      });

      return project ?? null;
    }),

  getAllByUserId: protectedProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const projectsByUserId = await ctx.db.project.findMany({
        where: {
          createdByUserId: input.userId,
        },
        orderBy: { createdAt: "desc" },
      });

      return projectsByUserId ?? null;
    }),

  create: protectedProcedure
    .input(ProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        createdByUserId,
        description,
        name,
        readme,
        repositoryLink,
        techStack,
      } = input;
      return ctx.db.project.create({
        data: {
          name,
          readme,
          repositoryLink,
          description,
          createdByUserId,
          techStack,
        },
      });
    }),
});
