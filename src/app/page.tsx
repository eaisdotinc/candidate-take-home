"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ChatBot from "./components/ChatBot";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subheaderRef = useRef<HTMLParagraphElement>(null);
  const chatBotContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state (elements are hidden)
    gsap.set([headerRef.current, subheaderRef.current, chatBotContainerRef.current], { opacity: 0, y: 50 });

    // Animate page background
    tl.fromTo(pageRef.current,
      { background: "linear-gradient(to bottom right, #ffffff, #e0e0e0)" },
      { background: "linear-gradient(to bottom right, #f0f0f0, #cccccc)", duration: 2, ease: "power2.inOut" }
    );

    // Animate header
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2 // Stagger start
    }, "-=1.5"); // Overlap with background animation

    // Animate subheader
    tl.to(subheaderRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7"); // Stagger after header

    // Animate chat container (where ChatBot component is)
    tl.to(chatBotContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)", // Playful elastic entrance
    }, "-=0.5"); // Stagger after subheader

    // Subtle parallax effect for background elements (optional, can be enhanced)
    const bgElement1 = pageRef.current?.querySelector(".bg-element-1") as HTMLElement;
    const bgElement2 = pageRef.current?.querySelector(".bg-element-2") as HTMLElement;

    if (bgElement1 && bgElement2) {
      document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30; // Adjust multiplier for sensitivity
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(bgElement1, { x: -x, y: -y, duration: 0.5, ease: "power1.out" });
        gsap.to(bgElement2, { x: x * 0.5, y: y * 0.5, duration: 0.5, ease: "power1.out" });
      });
    }

  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black relative overflow-hidden px-2 xs:px-4 sm:px-6 md:px-8 py-4 xs:py-8 sm:py-12 md:py-16 flex flex-col items-center">
      {/* Decorative background elements for GSAP-like feel */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <div className="bg-element-1 absolute top-[-20%] left-[-10%] w-[200px] h-[200px] xs:w-[300px] xs:h-[300px] md:w-[600px] md:h-[600px] bg-gray-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="bg-element-2 absolute bottom-[-20%] right-[-10%] w-[150px] h-[150px] xs:w-[250px] xs:h-[250px] md:w-[500px] md:h-[500px] bg-gray-800/5 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      {/* Hero section */}
      <header className="relative z-10 w-full max-w-xl text-left px-1 xs:px-2">
        <h1 ref={headerRef} className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-tight">
          <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">Modern Chat</span>
          <span className="block text-gray-400 text-2xl xs:text-3xl sm:text-4xl md:text-5xl mt-1 sm:mt-2">Experience</span>
        </h1>
        <p ref={subheaderRef} className="text-base xs:text-lg md:text-xl text-gray-600 font-medium max-w-lg">
          A sleek, GSAP-inspired interface for seamless conversations. Built for performance and style.
        </p>
      </header>

      {/* ChatBot placed responsively based on screen size */}
      <div ref={chatBotContainerRef} className="fixed bottom-2 xs:bottom-4 sm:bottom-6 md:bottom-8 right-2 xs:right-4 sm:right-6 md:right-8 z-20 w-[98vw] xs:w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] max-w-2xl">
        <ChatBot />
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8 sm:mt-12 md:mt-16 text-gray-500 text-xs sm:text-sm text-left px-2 w-full max-w-xl">
        Vintage Girl Demo &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
