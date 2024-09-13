import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.project.getAll.prefetch();

  return (
    <HydrateClient>
      <p>Hello world</p>
    </HydrateClient>
  );
}
