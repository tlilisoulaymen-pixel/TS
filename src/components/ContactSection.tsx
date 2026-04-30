"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:tlilisoulaymen@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 px-4 md:px-8 bg-[#050506]"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold tracking-wider mb-4">
            <span className="text-white">TRANSMIT</span>
            <span className="text-violet-400">SIGNAL</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Got a project? A weird idea? A challenge? Send it.
          </p>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-6 py-4 rounded-lg bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-0 transition-all"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-6 py-4 rounded-lg bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-0 transition-all"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-6 py-4 rounded-lg bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-0 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-lg font-orbitron text-sm tracking-wider uppercase bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all glow-button"
          >
            Send Transmission
          </button>
        </form>

        {/* Direct contact info */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs tracking-cosmic uppercase text-gray-500 mb-4">Or reach out directly</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
            <a href="mailto:tlilisoulaymen@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              tlilisoulaymen@gmail.com
            </a>
            <a href="tel:+21650321496" className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +216 50 321 496
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
