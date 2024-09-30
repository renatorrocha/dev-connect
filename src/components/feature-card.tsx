import { type LucideIcon } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface IFeatureCard {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export default function FeatureCard({
  title,
  description,
  Icon,
}: IFeatureCard) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="text-center">
        <Icon className="mx-auto mb-4 h-12 w-12 text-primary" />
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
