import Link from "next/link";
import FeatureCard from "~/components/feature-card";
import SignInButton from "~/components/signin-btn";
import { buttonVariants } from "~/components/ui/button";
import { FEATURE_CARDS } from "~/lib/constants";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.project.getAll.prefetch({});

  return (
    <HydrateClient>
      <div className="w-full">
        <section className="w-full bg-gradient-to-br from-primary/80 to-secondary-foreground py-12 text-white md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect. Create.{" "}
                  <span className="font-extrabold text-accent-foreground">
                    Innovate.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
                  Join a global community of developers. Share your ideas,
                  collaborate on projects, and push the boundaries of
                  innovation.
                </p>
              </div>
              {/* //todo make a sign-in view */}
              {/* <Link
                href="/signup"
                className={buttonVariants({ size: "lg", className: "mt-6" })}
              >
                Get Started
              </Link> */}
            </div>
          </div>
        </section>

        <section className="w-full bg-secondary py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-secondary-foreground sm:text-5xl">
              Why Choose <span className="text-primary">DevConnect</span>?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {FEATURE_CARDS.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  Icon={feature.Icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
              Featured Projects
            </h2>

            {/* Add more context to the "Coming Soon" message */}
            <div className="text-center">
              <p className="mb-4 text-lg font-semibold">Coming Soon!</p>
              <p className="text-muted-foreground">
                We&apos;re working on showcasing some amazing projects. Check
                back soon to see what our community is building!
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link href="/discover" className={buttonVariants({ size: "lg" })}>
                Explore Projects
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full bg-gradient-to-tl from-primary/80 to-secondary-foreground py-12 text-white md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to join the{" "}
                  <span className="font-extrabold text-accent-foreground">
                    community
                  </span>
                  ?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Sign up now and start connecting with developers, sharing
                  ideas, and building amazing projects together.
                </p>
              </div>
              <div className="mt-6 w-full max-w-sm space-y-2">
                <SignInButton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </HydrateClient>
  );
}
