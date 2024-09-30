"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <p className="text-lg font-semibold text-accent-foreground">
        Already logged in!
      </p>
    );
  }

  return (
    <Button
      onClick={() => signIn("github")}
      variant={"secondary"}
      className="w-full"
    >
      <GitHubLogoIcon className="mr-4 size-4" />
      Sign up to DevConnect
    </Button>
  );
}
