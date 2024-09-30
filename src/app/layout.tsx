import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "../components/header";

export const metadata: Metadata = {
  title: "Dev Connect",
  description:
    "Connect with developers from around the world and share your ideas and projects on a dynamic and interactive platform.",
  icons: [{ rel: "icon", url: "/logo_icon.svg" }],
  keywords: [
    "developers",
    "collaboration",
    "projects",
    "open source",
    "networking",
  ],
  authors: { name: "renatorrocha", url: "https://github.com/renatorrocha" },
  openGraph: {
    title: "Dev Connect - Connect with Developers",
    description:
      "Join our global community of developers and create new collaboration opportunities.",
    images: [
      {
        url: "/logo_icon.svg",
        width: 1200,
        height: 630,
        alt: "Dev Connect Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TRPCReactProvider>
          <header className="mb-4 flex flex-col items-center border-b border-gray-200 p-5 shadow-sm">
            <div className="w-full max-w-7xl">
              <Header />
            </div>
          </header>

          <main className="flex flex-col items-center">
            <div className="relative z-10 w-full max-w-7xl p-6">{children}</div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
