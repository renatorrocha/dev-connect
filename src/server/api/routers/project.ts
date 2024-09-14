import axios from "axios";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

interface GetReposRequest {
  id: string;
  name: string;
  description: string | null;
  language: string;
  url: string;
}

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany();

    return projects ?? null;
  }),

  getRepos: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;
      console.log(username);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`,
        );

        // create type
        return response.data as GetReposRequest;
      } catch (error) {
        throw new Error("Failed to fetch GitHub repos");
      }
    }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),
});
