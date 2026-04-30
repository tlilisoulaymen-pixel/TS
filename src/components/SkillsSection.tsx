"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Languages",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: ["C", "Python", "Java", "C++", "Solidity", "JavaScript", "TypeScript", "LaTeX"],
    color: "violet"
  },
  {
    title: "Frameworks & Web3",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    skills: ["Node.js", "Next.js", "Express.js", "React", "React Native", "FastAPI", "LangChain", "Hardhat", "Metasploit"],
    color: "blue"
  },
  {
    title: "AI & Data",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    skills: ["LLMs", "RAG", "OCR", "Agentic AI", "AI Pipelines", "MCP", "Harness", "Fine-tuning", "Embeddings"],
    color: "emerald"
  },
  {
    title: "Domains",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    skills: ["Full Stack Dev", "Algorithmic Finance", "Blockchain/Web3", "Cryptography", "Quantum Algorithms", "Numerical Analysis", "Systems Architecture"],
    color: "amber"
  }
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    glow: "shadow-violet-500/20"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/20"
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20"
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    glow: "shadow-amber-500/20"
  }
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-[#050506] via-[#0a0a0f] to-[#050506]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold tracking-wider mb-4">
            <span className="text-white">TECH</span>
            <span className="text-violet-400">STACK</span>
          </h2>
          <p className="text-xs tracking-cosmic uppercase text-gray-500">
            Technical Competencies — Forged Through Experience
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => {
            const colors = colorClasses[category.color];
            return (
              <div
                key={category.title}
                className={`rounded-xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all duration-700 hover:shadow-lg ${colors.glow} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`${colors.text}`}>
                    {category.icon}
                  </div>
                  <h3 className={`font-orbitron text-lg ${colors.text}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`tech-tag text-sm px-3 py-1.5 rounded-lg text-gray-300 cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {[
            { value: "14+", label: "Trading Bots" },
            { value: "Top 5%", label: "National Ranking" },
            { value: "5+", label: "Tech Domains" },
            { value: "2024", label: "Student-Entrepreneur" }
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-lg border border-violet-500/10 bg-black/20">
              <div className="font-orbitron text-2xl md:text-3xl text-violet-400 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
