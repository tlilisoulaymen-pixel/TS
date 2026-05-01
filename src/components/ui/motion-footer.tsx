"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// THEME STYLES — Portfolio-adapted (violet/dark cosmic)
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1);   filter: drop-shadow(0 0 4px rgba(139,92,246,0.4)); }
  15%, 45% { transform: scale(1.25); filter: drop-shadow(0 0 12px rgba(139,92,246,0.9)); }
  30%      { transform: scale(1); }
}

.animate-footer-breathe      { animation: footer-breathe      8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee{ animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat    { animation: footer-heartbeat    2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

/* Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Aurora Glow — violet + blue */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(139, 92, 246, 0.18) 0%,
    rgba(110, 157, 232, 0.12) 40%,
    transparent 70%
  );
}

/* Glass Pill */
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(139,92,246,0.08) 0%, rgba(110,157,232,0.04) 100%);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.6), inset 0 1px 1px rgba(139,92,246,0.15);
  border: 1px solid rgba(139,92,246,0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: #9ca3af;
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(139,92,246,0.18) 0%, rgba(110,157,232,0.08) 100%);
  border-color: rgba(139,92,246,0.5);
  box-shadow: 0 20px 40px -10px rgba(139,92,246,0.25), inset 0 1px 1px rgba(139,92,246,0.25), 0 0 20px rgba(139,92,246,0.15);
  color: #fff;
}

/* Giant Background Text */
.footer-giant-bg-text {
  font-size: 22vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(139,92,246,0.08);
  background: linear-gradient(180deg, rgba(139,92,246,0.12) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Orbitron', sans-serif;
}

/* Metallic Heading Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #fff 0%, rgba(139,92,246,0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(139,92,246,0.3));
}

/* Marquee stripe */
.footer-marquee-stripe {
  background: rgba(5,5,6,0.75);
  border-top: 1px solid rgba(139,92,246,0.15);
  border-bottom: 1px solid rgba(139,92,246,0.15);
  backdrop-filter: blur(12px);
}
`;

// -------------------------------------------------------------------------
// MAGNETIC BUTTON
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * 0.35, y: y * 0.35, rotationX: -y * 0.12, rotationY: x * 0.12, scale: 1.06, ease: "power2.out", duration: 0.4 });
        };
        const handleMouseLeave = () => {
          gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
        };
        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// MARQUEE CONTENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 font-orbitron">
    <span>AI Engineering</span>           <span className="text-violet-500">✦</span>
    <span>Full-Stack Systems</span>        <span className="text-blue-400">✦</span>
    <span>Blockchain Architecture</span>   <span className="text-violet-500">✦</span>
    <span>Algorithmic Trading</span>       <span className="text-blue-400">✦</span>
    <span>Computational Physics</span>     <span className="text-violet-500">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// MAIN FOOTER
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 },
        }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 45%", end: "bottom bottom", scrub: 1 },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        id="contact"
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#050506] text-white cinematic-footer-wrapper">

          {/* Aurora glow */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[100px] pointer-events-none z-0" />
          {/* Grid */}
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            TS
          </div>

          {/* Marquee stripe */}
          <div className="absolute top-10 left-0 w-full overflow-hidden footer-marquee-stripe py-4 z-10 -rotate-1 scale-105">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm tracking-[0.25em] text-gray-500 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-5xl mx-auto">

            <p className="font-orbitron text-xs tracking-cosmic uppercase text-violet-400 mb-4">
              Signal Origin — Tunis, Tunisia
            </p>

            <h2
              ref={headingRef}
              className="font-orbitron text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-10 text-center"
            >
              Let&apos;s Connect.
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">

              {/* Primary CTA buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="mailto:tlilisoulaymen@gmail.com"
                  className="footer-glass-pill px-8 py-4 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  {/* Email icon */}
                  <svg className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send an Email
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="https://linkedin.com/in/tlili-soulaymen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-8 py-4 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  {/* LinkedIn icon */}
                  <svg className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="https://github.com/souladev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-glass-pill px-8 py-4 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  {/* GitHub icon */}
                  <svg className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </MagneticButton>
              </div>

              {/* Secondary pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-1">
                <MagneticButton
                  as="a"
                  href="/CV_SOULAYMEN.pdf"
                  download="Tlili_Soulaymen_CV.pdf"
                  className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="tel:+21650321496"
                  className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +216 50 321 496
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Logo & Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 order-2 md:order-1">
              <Link href="/" aria-label="Go to profile top">
                <img 
                  src="/ts-logo.png" 
                  alt="TS Logo" 
                  className="h-10 w-auto hover:opacity-80 transition-opacity" 
                />
              </Link>
              <p className="text-gray-600 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center md:text-left">
                © {new Date().getFullYear()} Tlili Soulaymen. All rights reserved.
              </p>
            </div>

            {/* Crafted with badge */}
            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm text-violet-400">♥</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs tracking-normal ml-0.5">Soulaymen</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center group order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>

        </footer>
      </div>
    </>
  );
}
