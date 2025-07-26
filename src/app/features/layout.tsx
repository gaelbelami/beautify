import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - Beautify",
  description: "Discover all the powerful features that make Beautify the perfect choice for your projects.",
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}