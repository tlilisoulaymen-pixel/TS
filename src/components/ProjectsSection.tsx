"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Web & Mobile Apps",
    status: "Active",
    description: "Designed and delivered a wide spectrum of web and mobile applications integrating cutting-edge AI technologies — LangChain, RAG, OCR — with diverse stacks (Next.js, React Native, FastAPI, Supabase, Vercel) for academic institutions and private enterprises.",
    highlights: [
      "Certified Upwork freelancer — end-to-end solutions for international clients",
      "From MVPs to production systems",
      "Integration of LLMs, embeddings, and orchestration pipelines"
    ],
    tags: ["Next.js", "React Native", "FastAPI", "LangChain", "RAG"],
    color: "violet",
    link: "https://github.com/souladev"
  },
  {
    id: 2,
    title: "Financial Engineering & Algorithmic Trading",
    status: "Active",
    description: "Designed and deployed 14+ algorithmic trading bots on equity and forex markets, integrating multi-level strategies focused on performance and risk management.",
    highlights: [
      "Advanced metrics: PnL, Sharpe ratio, max drawdown, win rate, Calmar ratio, VaR",
      "Cross-strategy correlation analysis",
      "Statistical risk modeling and rigorous backtesting"
    ],
    tags: ["Python", "Statistics", "Risk Analysis", "Trading"],
    color: "blue",
    link: "https://github.com/souladev"
  },
  {
    id: 3,
    title: "Systems Architecture & Vulnerability Analysis",
    status: "Completed",
    description: "Conducted end-to-end system architecture audits, identifying critical vulnerabilities in data flows — with focus on type safety, serialization boundaries, implicit state mutations, and inter-service contracts.",
    highlights: [
      "Proposed and implemented architectural refactors",
      "Eliminated failure points from type inconsistencies",
      "Controlled data propagation patterns"
    ],
    tags: ["Architecture", "Security", "TypeScript", "Metasploit"],
    color: "emerald",
    link: "https://github.com/souladev"
  },
  {
    id: 4,
    title: "AMKA — Adaptive Multi-Kangaroo Algorithm",
    status: "Research",
    description: "Novel optimization algorithm for discrete logarithm problems. Reduced time complexity from O(n²) to O(n²/m) through parallel kangaroo walks.",
    highlights: [
      "Dynamic trajectory optimization with adaptive step sizes",
      "Significantly accelerates cryptanalysis",
      "Cryptographic robustness evaluation"
    ],
    tags: ["Cryptography", "Algorithms", "Python", "Mathematics"],
    color: "amber",
    link: "https://github.com/souladev"
  },
  {
    id: 5,
    title: "Blockchain & Web3 Ecosystem",
    status: "Active",
    description: "Developed and deployed smart contracts and DApps on EVM-compatible chains (Ethereum, Polygon), with contract security audits.",
    highlights: [
      "Flash loan arbitrage strategies",
      "End-to-end decentralized Web3 protocol integration",
      "Full Web3 stack: Solidity, Hardhat, ethers.js, IPFS, multi-chain deployment"
    ],
    tags: ["Solidity", "Hardhat", "Ethereum", "Web3"],
    color: "cyan",
    link: "https://github.com/souladev"
  }
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Research: "bg-amber-500/20 text-amber-400 border-amber-500/30"
};

const tagColors: Record<string, string> = {
  violet: "border-violet-500/30 hover:border-violet-500",
  blue: "border-blue-500/30 hover:border-blue-500",
  emerald: "border-emerald-500/30 hover:border-emerald-500",
  amber: "border-amber-500/30 hover:border-amber-500",
  cyan: "border-cyan-500/30 hover:border-cyan-500"
};

export default function ProjectsSection() {
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
      id="projects"
      className="relative py-24 px-4 md:px-8 bg-[#050506]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold tracking-wider mb-4">
            <span className="text-white">GALAX</span>
            <span className="text-violet-400">IES</span>
          </h2>
          <p className="text-xs tracking-cosmic uppercase text-gray-500">
            Selected Projects — Each One a World of Its Own
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card group block rounded-xl border ${tagColors[project.color]} bg-black/30 backdrop-blur-sm p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="font-orbitron text-lg text-white mb-3 group-hover:text-violet-300 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="text-gray-600 text-xs space-y-1 mb-4">
                {project.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-violet-500 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            href="https://github.com/souladev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-violet-500/30 bg-black/30 backdrop-blur-sm hover:border-violet-500 hover:bg-violet-500/10 transition-all glow-button"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="font-orbitron text-sm tracking-wider text-white">Explore All Repositories</span>
          </a>
        </div>
      </div>
    </section>
  );
}
