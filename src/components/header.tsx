import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import AuthButton from "./auth-btn";
import { getServerAuthSession } from "~/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="flex items-center justify-between">
      <Link href={"/"}>Logo</Link>

      <nav className="flex items-center gap-5">
        <Link href="/discover" className={buttonVariants({ variant: "link" })}>
          Discover
        </Link>

        {session && (
          <Link
            href="/your-projects"
            className={buttonVariants({ variant: "link" })}
          >
            Your Projects
          </Link>
        )}

        <AuthButton />
      </nav>
    </header>
  );
}
