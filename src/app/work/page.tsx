import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import WorkGrid from "@/components/sections/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "All brand identity, logo and packaging case studies by Raiyan Faisal — each linked to its full Behance presentation.",
};

export default function WorkPage() {
  return (
    <PageTransition>
      <WorkGrid />
    </PageTransition>
  );
}
