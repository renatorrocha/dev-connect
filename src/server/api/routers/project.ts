import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ProjectSchema } from "~/lib/schemas/project-schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany();

    return projects ?? null;
  }),

  getById: publicProcedure
    .input(
      z.object({ projectId: z.string(), userId: z.string().cuid().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: {
          id: input.projectId,
          createdByUserId: input.userId,
        },
        include: {
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!project)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project Not Found !",
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
        projectType,
      } = input;
      return ctx.db.project.create({
        data: {
          name,
          readme,
          repositoryLink,
          description,
          createdByUserId,
          projectType,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({ projectId: z.string().cuid(), userId: z.string().cuid() }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, userId } = input;

      const project = await ctx.db.project.findUnique({
        where: { id: projectId, createdByUserId: userId },
      });

      if (!project)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not Found !",
        });

      return ctx.db.project.delete({
        where: { id: projectId, createdByUserId: userId },
      });
    }),

  update: protectedProcedure
    .input(ProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        description,
        name,
        readme,
        repositoryLink,
        projectType,
        id,
        createdByUserId,
      } = input;

      return ctx.db.project.update({
        where: { id, createdByUserId },

        data: {
          name,
          readme,
          description,
          repositoryLink,
          projectType,
        },
      });
    }),
});
