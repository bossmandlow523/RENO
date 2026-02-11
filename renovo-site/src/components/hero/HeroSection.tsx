import { useRef, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        snap: {
          snapTo: (progress: number, self: any) => {
            if (self.direction === 1 && progress > 0.08) return 1;
            if (self.direction === -1 && progress < 0.85) return 0;
            return progress;
          },
          duration: { min: 0.2, max: 0.4 },
          ease: "power2.inOut",
        },
      });
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col justify-between overflow-x-clip"
    >
      {/* ── Frosted Glass System ── */}

      {/* Base: backdrop-blur + tinted dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 backdrop-blur-[8px]"
        style={{ background: "rgba(10, 10, 10, 0.45)" }}
      />

      {/* Warm amber glow — top-right, largest presence */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,127,0,0.14) 0%, rgba(255,153,51,0.07) 40%, transparent 70%)",
        }}
      />

      {/* Bright accent core — center golden warmth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,204,128,0.09) 0%, rgba(255,153,51,0.04) 50%, transparent 80%)",
        }}
      />

      {/* Specular lens highlight — soft bright area at top */}
      <div
        className="absolute top-0 left-[15%] w-[70%] h-[250px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* SVG grain texture — feTurbulence noise */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{ opacity: 0.03, mixBlendMode: "overlay" }}
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow px-5 sm:px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-0 pt-36 sm:pt-40 md:pt-24">
        {/* Left — Text */}
        <div className="w-full md:w-[45%] flex flex-col items-start relative pl-1 sm:pl-4 md:pl-12">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative text-2xl sm:text-3xl md:text-5xl font-black tracking-wide -mb-1 uppercase pb-3 font-display text-white"
          >
            We Buy
            <span
              className="absolute bottom-0 left-0 w-full h-1.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, #FFCC80 0%, #FF9933 40%, #FF7F00 100%)",
                boxShadow: "0 0 12px rgba(255, 127, 0, 0.4), 0 0 30px rgba(255, 127, 0, 0.15)",
              }}
            />
          </motion.h2>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase tracking-tighter text-white mb-6 sm:mb-8 font-display">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              className="inline-block text-white"
              style={{
                filter: "drop-shadow(0 2px 10px rgba(200, 200, 210, 0.25))",
              }}
            >
              Scrap
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="relative inline-block pb-2 metal-shimmer"
              style={{
                filter: "drop-shadow(0 2px 10px rgba(200, 200, 210, 0.25))",
                animationDelay: "6s",
              }}
            >
              Metal
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute bottom-0 left-0 w-full h-[5px] md:h-[7px] origin-left rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #FF7F00 0%, #FF9933 60%, #FFCC80 100%)",
                  boxShadow:
                    "0 0 20px rgba(255, 127, 0, 0.4), 0 0 60px rgba(255, 127, 0, 0.15)",
                }}
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
            className="max-w-lg text-xs sm:text-sm md:text-sm text-white font-body font-normal leading-relaxed mb-8 sm:mb-14 pl-1 border-l-2 border-slate-700 md:border-none md:pl-0"
          >
            Welcome to Renovo Resource Solutions, a recycling center in Manatee County. Since opening in 2017, we have evolved from processing a few thousand pounds of material each month to 1.5 million pounds, driven by strong partnerships with local businesses and our dedication to the community. We are committed to delivering exceptional customer service for residential and commercial clients alike, averaging under 7 minutes per visit with capacity for 20 customers at once, all while maintaining the highest standards of compliance and cleanliness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: "easeOut" }}
            className="flex items-center gap-3 sm:gap-4 pl-1"
          >
            {[
              { src: "/badges/bbb-accredited.png", alt: "BBB Accredited Business A+" },
              { src: "/badges/isri-member.jpeg", alt: "ISRI Member" },
              { src: "/badges/bbc-member.jpeg", alt: "Better Business Council Member" },
              { src: "/badges/manatee-chamber.png", alt: "Manatee Chamber of Commerce Member" },
            ].map((badge, i) => (
              <motion.div
                key={badge.alt}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.05 + i * 0.1, ease }}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center hover:scale-105 transition-all duration-300"
              >
                <img
                  src={badge.src}
                  alt={badge.alt}
                  className="w-full h-full object-contain brightness-90 contrast-90 grayscale-[30%] hover:grayscale-0 hover:brightness-100 hover:contrast-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Right — Hexagonal Images */}
        <div className="w-full md:w-[55%]">
          <div className="relative h-[340px] sm:h-[450px] md:h-[600px] flex items-center justify-center translate-x-0 sm:translate-x-4 md:translate-x-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
              className="absolute z-10 w-[254px] h-[254px] sm:w-[379px] sm:h-[379px] md:w-[604px] md:h-[604px] hexagon backdrop-blur-xl shadow-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(255,204,128,0.35), rgba(255,153,51,0.35), rgba(255,127,0,0.35))" }}
            >
              <div className="w-[250px] h-[250px] sm:w-[375px] sm:h-[375px] md:w-[600px] md:h-[600px] hexagon overflow-hidden">
                <img
                  alt="Industrial Scrap Metal Crane"
                  className="hexagon-image"
                  src="/hero-hexagon.jpeg"
                />
              </div>
            </motion.div>

            <motion.a
              href="https://maps.google.com/?q=3324+63rd+Ave+E,+Bradenton,+FL+34203"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease }}
              className="absolute bottom-[-8%] sm:bottom-[-11%] left-[46%] sm:left-[42%] w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 hexagon bg-navy-700/20 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-white p-2 sm:p-3 md:p-6 shadow-2xl z-20 hover:scale-105 transition-all duration-300 group cursor-pointer"
              style={{ filter: "drop-shadow(0 0 2px rgba(255,153,51,0.4)) drop-shadow(0 0 6px rgba(255,127,0,0.15))" }}
            >
              <span className="font-body text-[9px] sm:text-[10px] md:text-sm font-bold tracking-widest leading-tight text-center">
                WE ARE OPEN
              </span>
              <div className="flex flex-col items-center mt-0.5 md:mt-2 gap-0.5 md:gap-1">
                <span className="text-[8px] sm:text-[9px] md:text-[13px] font-body font-normal text-white/80 uppercase tracking-wider text-center leading-none">
                  Mon–Fri 8–5
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] md:text-[10px] font-body font-normal text-white/50 tracking-wider text-center leading-none">
                  last load 4:50pm
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[13px] font-body font-normal text-white/80 uppercase tracking-wider text-center leading-none mt-0.5 md:mt-1">
                  Sat 8–2
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] md:text-[10px] font-body font-normal text-white/50 tracking-wider text-center leading-none">
                  last load 1:50pm
                </span>
              </div>
              <div className="w-6 sm:w-8 md:w-10 h-px bg-white/20 my-0.5 sm:my-1 md:my-1.5" />
              <div className="flex items-center gap-1 md:gap-1.5 group-hover:text-accent-200 transition-colors">
                <span className="material-symbols-outlined text-sm sm:text-base md:text-xl rotate-45">
                  arrow_upward
                </span>
                <span className="font-body text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-[0.15em]">
                  DIRECTIONS
                </span>
              </div>
            </motion.a>

            <motion.a
              href="#materials"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                document.getElementById("materials")?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.05, ease }}
              className="absolute bottom-[0%] sm:bottom-[-2%] left-[5%] sm:left-[10%] md:left-[12%] z-20 group cursor-pointer"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-navy-900/20 backdrop-blur-xl border border-white/10 hexagon shadow-2xl transition-transform group-hover:scale-105 duration-300" style={{ filter: "drop-shadow(0 0 2px rgba(255,153,51,0.4)) drop-shadow(0 0 6px rgba(255,127,0,0.15))" }} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="font-body text-white text-xs sm:text-sm md:text-base tracking-[0.15em] font-bold">
                    WHAT
                    <br />
                    WE BUY
                  </span>
                  <div className="w-6 sm:w-8 md:w-10 h-px bg-white/20 my-1 sm:my-1.5 md:my-2" />
                  <span className="material-symbols-outlined text-white text-lg sm:text-xl md:text-3xl group-hover:text-accent-200 group-hover:translate-y-0.5 transition-all duration-300">
                    arrow_downward
                  </span>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Hero Footer Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-20 px-5 sm:px-8 md:px-16 pb-8 sm:pb-12 pt-4 flex flex-wrap justify-between items-end text-xs font-medium tracking-widest text-slate-500"
      >
        <div />
        <div className="hidden md:flex gap-2 items-center text-[10px] text-white">
          <span>LOCATED IN BRADENTON, FLORIDA</span>
          <span className="text-white/30">|</span>
          <span>3324 63RD AVE E, BRADENTON, FL 34203</span>
        </div>
      </motion.div>
    </section>
  );
}
