import Hero from "@/components/sections/Hero";
import AboutIntro from "@/components/sections/AboutIntro";
import SelectedWork from "@/components/sections/SelectedWork";
import StatsMarquee from "@/components/sections/StatsMarquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import PageTransition from "@/components/PageTransition";

export default function HomePage() {
  return (
    <PageTransition restoreScrollKey>
      <Hero />
      <AboutIntro />
      <SelectedWork />
      <StatsMarquee />
      <Services />
      <Process />
      <Contact />
    </PageTransition>
  );
}
