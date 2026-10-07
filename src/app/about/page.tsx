import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Raiyan Faisal is a graphic & branding designer with 3.5+ years of experience crafting logos and identity systems. Based in Riyadh, available for freelance.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutContent />
    </PageTransition>
  );
}
