declare type SearchParamProps = {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
};

declare type TechStack = "FRONTEND" |  "BACKEND" |  "FULLSTACK"