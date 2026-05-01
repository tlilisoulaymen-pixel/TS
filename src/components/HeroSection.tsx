"use client";

import { useEffect, useState, useRef } from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        videoRef.current.play().catch((e) => {
          console.log("Audio playback requires user interaction", e);
        });
      }
    }
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050506]"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/interstellar-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050506]" />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-violet-500/20 rounded-full animate-orbit"
          style={{ transform: `rotate(${scrollY * 0.02}deg)` }}
        />
        <div
          className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] border border-blue-500/15 rounded-full animate-orbit-reverse"
          style={{ transform: `rotate(${-scrollY * 0.03}deg)` }}
        />
        <div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-violet-400/10 rounded-full animate-orbit"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-black/30 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs tracking-cosmic uppercase text-gray-300">
            Student-Entrepreneur
          </span>
          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>

        {/* Name - Large stylized */}
        <div className="h-[120px] md:h-[200px] flex items-center justify-center mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <GooeyText
            texts={["TS dev", "ENGINEER", "BUILDER", "CREATOR"]}
            morphTime={1}
            cooldownTime={0.5}
            textClassName="font-orbitron font-bold text-violet-400 text-6xl md:text-8xl lg:text-9xl"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="font-orbitron text-sm md:text-base tracking-cosmic uppercase text-violet-300">
            Tlili Soulaymen — Versatile Engineer
          </p>
          <p className="text-xs md:text-sm tracking-wider-cosmic uppercase text-gray-400">
            Origin Tunis. Quality Undeniable.
          </p>
        </div>

        {/* Portfolio hint */}
        <p className="mt-6 text-xs tracking-cosmic uppercase text-gray-500 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          Portfolio · Five Galaxies Below · All Live in Production
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs tracking-cosmic uppercase">Scroll to Explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Sound toggle - functional */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-10 right-10 w-12 h-12 rounded-full border border-violet-500/30 bg-black/30 backdrop-blur-sm flex items-center justify-center hover:border-violet-500/60 hover:bg-violet-500/10 transition-all group"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? (
          <svg className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </section>
  );
}
