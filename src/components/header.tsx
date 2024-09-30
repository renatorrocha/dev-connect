import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import AuthButton from "./auth-btn";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import { cn } from "~/lib/utils";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="flex items-center justify-between">
      <Link
        href={"/"}
        className="flex items-center gap-4 transition-all duration-300 md:hover:translate-x-2"
      >
        <Image
          src={"/logo_icon.svg"}
          alt=""
          width={100}
          height={100}
          className="size-10"
        />

        <p className="hidden text-lg font-medium md:block">
          Dev
          <span className="gradient-primary-secondary font-bold">.Connect</span>
        </p>
      </Link>

      <nav className="flex items-center gap-5">
        <Link
          href="/discover"
          className={cn(
            buttonVariants({ variant: "link" }),
            "transition-all duration-300 hover:font-bold",
          )}
        >
          Discover
        </Link>

        {session && (
          <Link
            href="/your-projects"
            className={cn(
              buttonVariants({ variant: "link" }),
              "transition-all duration-300 hover:font-bold",
            )}
          >
            Your Projects
          </Link>
        )}

        <AuthButton />
      </nav>
    </header>
  );
}
