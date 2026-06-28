import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { SystemsShowcase } from "@/components/sections/systems-showcase";
import { TechStack } from "@/components/sections/tech-stack";
import { Practices } from "@/components/sections/practices";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <SystemsShowcase />
        <TechStack />
        <Practices />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
