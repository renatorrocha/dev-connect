import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function YourProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (!session) redirect("/");

  return <div className="container mt-10 max-w-6xl px-8">{children}</div>;
}
