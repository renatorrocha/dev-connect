import React from "react";
import { getServerAuthSession } from "~/server/auth";

export default function Header() {
  const session = getServerAuthSession();
  return (
    <header className="border py-8">
      <picture>Logo</picture>

      <nav></nav>
    </header>
  );
}
