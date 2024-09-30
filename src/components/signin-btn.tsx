"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
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
