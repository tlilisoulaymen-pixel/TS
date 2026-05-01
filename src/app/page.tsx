"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import StarsBackground from "@/components/StarsBackground";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <StarsBackground />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CinematicFooter />
    </main>
  );
}
