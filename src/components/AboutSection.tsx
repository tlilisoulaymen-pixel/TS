"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4 md:px-8 bg-[#050506]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Portrait placeholder */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-lg border border-violet-500/30 overflow-hidden bg-gradient-to-br from-violet-900/20 to-blue-900/20 flex items-center justify-center relative">
              <Image 
                src="/PDP.png" 
                alt="Tlili Soulaymen Profile Picture" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-xl -z-10" />
          </div>
        </div>

        {/* Label */}
        <p className={`text-center text-xs tracking-cosmic uppercase text-violet-400 mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Signal Origin — Tunis, Tunisia
        </p>

        {/* Main quote */}
        <h2 className={`font-orbitron text-3xl md:text-5xl text-center leading-tight mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="gradient-text">
            Somewhere between physics and code, I build intelligent systems.
          </span>
        </h2>

        {/* Description */}
        <div className={`space-y-6 text-gray-400 text-center max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p>
            Systems that think, learn, and scale. Full-stack applications powered by AI.
            Smart contracts that execute flawlessly. Algorithms that break complexity barriers.
          </p>

          <p>
            I&apos;m Soulaymen — a versatile engineering student at ENSTA Borj Cedria,
            combining rigorous mathematical physics with high-level technical expertise.
            From AI pipelines to blockchain architectures, from algorithmic trading to
            cryptographic analysis.
          </p>

          <p className="text-violet-300/80">
            &ldquo;Holder of the Student-Entrepreneur status awarded by the University of Carthage.&rdquo;
          </p>

          <p>
            If your project needs intelligent automation, blockchain infrastructure,
            or systems that push boundaries — let&apos;s connect.
          </p>
        </div>

        {/* Connect links */}
        <div className={`flex justify-center gap-4 mt-10 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs tracking-cosmic uppercase text-violet-400">Let&apos;s Connect</p>
        </div>

        <div className={`flex justify-center gap-4 mt-4 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            href="mailto:tlilisoulaymen@gmail.com"
            className="w-12 h-12 rounded-full border border-violet-500/30 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:border-violet-500 hover:bg-violet-500/10 transition-all"
            aria-label="Email"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tlili-soulaymen"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-violet-500/30 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:border-violet-500 hover:bg-violet-500/10 transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/souladev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-violet-500/30 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:border-violet-500 hover:bg-violet-500/10 transition-all"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </div>

        {/* Download CV Button */}
        <div className={`flex justify-center mt-10 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            href="/CV_SOULAYMEN.pdf"
            download="Tlili_Soulaymen_CV.pdf"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-violet-500/30 bg-violet-500/10 text-white hover:border-violet-500 hover:bg-violet-500/20 transition-all backdrop-blur-sm glow-button font-orbitron tracking-wider text-sm"
          >
            <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Education Timeline */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="h-[60px] md:h-[80px] flex items-center justify-center mb-10">
            <GooeyText
              texts={["EDUCATION", "BACKGROUND", "ACADEMICS"]}
              morphTime={1}
              cooldownTime={1.5}
              textClassName="font-orbitron text-xl md:text-3xl font-bold text-violet-400 tracking-wider"
            />
          </div>

          <div className="space-y-8">
            {/* ENSTA */}
            <div className="border-gradient rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h4 className="font-orbitron text-lg text-white">ENSTA Borj Cedria</h4>
                <span className="text-sm text-violet-400">2024 — Present</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Equivalent to Ecole Polytechnique de Tunisie — Engineering Program, University of Carthage
              </p>
              <ul className="text-gray-500 text-sm space-y-1">
                <li>• Versatile engineering degree with interdisciplinary approach</li>
                <li>• Strong foundation in Mathematical Physics, focused on simulations and numerical analysis</li>
                <li>• Advanced AI skills: RAG, OCR, LLMs, Agentic AI, MCP, Harness frameworks</li>
              </ul>
            </div>

            {/* IPEIM */}
            <div className="border-gradient rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h4 className="font-orbitron text-lg text-white">IPEIM Monastir</h4>
                <span className="text-sm text-violet-400">Sept 2022 — June 2024</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Intensive Physics-Chemistry Program (Equivalent to French CPGE)
              </p>
              <ul className="text-gray-500 text-sm space-y-1">
                <li>• Two-year intensive program preparing for top engineering schools</li>
                <li>• Focus on advanced mathematics, physics, and chemistry</li>
                <li>• Ranked in top 5% nationally at engineering school entrance exams</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
