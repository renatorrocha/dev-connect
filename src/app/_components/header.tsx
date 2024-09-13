import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import AuthButton from "./auth-btn";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <picture>Logo</picture>

      <nav className="flex items-center gap-5">
        <Link href="#" className={buttonVariants({ variant: "link" })}>
          Discover
        </Link>

        <Link href="#" className={buttonVariants({ variant: "link" })}>
          Your Projects
        </Link>

        <AuthButton />
      </nav>
    </header>
  );
}
