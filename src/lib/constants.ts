import { Code, Globe, Lightbulb } from "lucide-react";

export const PROJECTTYPES = [
  { label: "Frontend", value: "FRONTEND" },
  { label: "Backend", value: "BACKEND" },
  { label: "FullStack", value: "FULLSTACK" },
];

export const FEATURECARDS = [
  {
    title: "Global Network",
    description:
      "Connect with developers from around the world and expand your professional network.",
    Icon: Globe,
  },
  {
    title: "Idea Sharing",
    description:
      "Share your innovative ideas and get feedback from experienced developers.",
    Icon: Lightbulb,
  },
  {
    title: "Collaborative Projects",
    description:
      "Find collaborators for your projects or contribute to exciting open-source initiatives.",
    Icon: Code,
  },
];
