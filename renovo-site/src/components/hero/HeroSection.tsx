import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroScrollTransition } from "./animation-config";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // GSAP pin — pins hero in place, pinSpacing:false lets next section slide over
  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: (v: number, self: any) => {
            if (self.direction === -1) return v;
            return v > 0.12 ? 0.667 : 0;
          },
          duration: { min: 0.1, max: 0.35 },
          delay: 0,
          ease: "power2.inOut",
        },
        id: "hero-pin",
      });
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Framer Motion scroll progress for parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const { heroExit, overlay } = heroScrollTransition;

  const textY = useTransform(
    scrollYProgress,
    heroExit.progress,
    shouldReduceMotion ? [0, 0] : heroExit.headlineY
  );
  const textOpacity = useTransform(
    scrollYProgress,
    heroExit.progress,
    heroExit.headlineOpacity
  );

  const imageY = useTransform(
    scrollYProgress,
    heroExit.progress,
    shouldReduceMotion ? [0, 0] : heroExit.imageY
  );
  const imageScale = useTransform(
    scrollYProgress,
    heroExit.progress,
    shouldReduceMotion ? [1, 1] : heroExit.imageScale
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    heroExit.progress,
    heroExit.imageOpacity
  );

  const bgOpacity = useTransform(
    scrollYProgress,
    heroExit.progress,
    heroExit.bgOpacity
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    overlay.progress,
    shouldReduceMotion ? [0, 0, 0] : overlay.opacity
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-[1] h-screen flex flex-col justify-between industrial-bg overflow-x-clip"
      style={{
        backgroundImage: "url('/darkshell.jpeg')",
        backgroundSize: "120%",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Accent glow — fades with scroll */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-accent-500/[0.04] rounded-full blur-[80px] sm:blur-[120px]" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow px-5 sm:px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-0 pt-28 sm:pt-32 md:pt-8">
        {/* Left — Text */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="w-full md:w-[45%] flex flex-col items-start relative pl-1 sm:pl-4 md:pl-12"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-wide mb-2 uppercase"
            style={{
              fontFamily: "'Chonburi', cursive",
              color: "white",
            }}
          >
            We Buy
          </motion.h2>

          <div
            className="w-24 h-1.5 rounded-full mb-4"
            style={{
              background: "linear-gradient(90deg, #FFCC80 0%, #FF9933 40%, #FF7F00 100%)",
              boxShadow: "0 0 12px rgba(255, 127, 0, 0.4), 0 0 30px rgba(255, 127, 0, 0.15)",
            }}
          />

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase tracking-tighter text-white mb-6 sm:mb-8" style={{ fontFamily: "'Chonburi', cursive" }}>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              className="relative inline-block pb-2 metal-shimmer"
              style={{
                filter: "drop-shadow(0 2px 10px rgba(200, 200, 210, 0.25))",
              }}
            >
              Scrap
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
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="inline-block metal-shimmer"
              style={{
                filter: "drop-shadow(0 2px 10px rgba(200, 200, 210, 0.25))",
                animationDelay: "6s",
              }}
            >
              Metal
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
            className="max-w-md text-sm sm:text-base md:text-lg text-slate-400 font-light leading-relaxed mb-6 sm:mb-10 pl-1 border-l-2 border-slate-700 md:border-none md:pl-0"
          >
            Manatee County's premier recycling center. Turn your industrial
            debris into profit with our state-of-the-art metal processing
            facility.
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
        </motion.div>

        {/* Right — Hexagonal Images */}
        <motion.div
          style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
          className="w-full md:w-[55%]"
        >
          <div className="relative h-[340px] sm:h-[450px] md:h-[600px] flex items-center justify-center translate-x-0 sm:translate-x-4 md:translate-x-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
              className="absolute z-10 w-[260px] h-[260px] sm:w-[385px] sm:h-[385px] md:w-[612px] md:h-[612px] hexagon bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center"
            >
              <div className="w-[250px] h-[250px] sm:w-[375px] sm:h-[375px] md:w-[600px] md:h-[600px] hexagon overflow-hidden">
                <img
                  alt="Industrial Scrap Metal Crane"
                  className="hexagon-image"
                  src="/hero-hexagon.jpeg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            <motion.a
              href="https://maps.google.com/?q=3505+US-41,+Palmetto,+FL+34221"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="absolute bottom-[-8%] sm:bottom-[-11%] left-[46%] sm:left-[42%] w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 hexagon bg-navy-700/20 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-white p-2 sm:p-3 md:p-6 shadow-2xl z-20 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <span className="font-accent text-[9px] sm:text-[10px] md:text-sm font-bold tracking-widest leading-tight text-center">
                WE ARE OPEN
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[11px] mt-0.5 md:mt-1 font-body opacity-80 uppercase tracking-widest text-center">
                7AM - 4PM
              </span>
              <div className="w-6 sm:w-8 md:w-10 h-px bg-white/20 my-1 sm:my-1.5 md:my-2" />
              <div className="flex items-center gap-1 md:gap-1.5 group-hover:text-accent-200 transition-colors">
                <span className="material-symbols-outlined text-sm sm:text-base md:text-xl rotate-45">
                  arrow_upward
                </span>
                <span className="font-accent text-[7px] sm:text-[8px] md:text-[10px] font-bold tracking-[0.15em]">
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease }}
              className="absolute bottom-[0%] sm:bottom-[-2%] left-[5%] sm:left-[10%] md:left-[12%] z-20 group cursor-pointer"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-navy-900/20 backdrop-blur-xl border border-white/10 hexagon shadow-2xl transition-transform group-hover:scale-105 duration-300" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="font-accent text-white text-xs sm:text-sm md:text-base tracking-[0.15em] font-bold">
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
        </motion.div>
      </div>

      {/* Hero Footer Bar */}
      <motion.div style={{ opacity: textOpacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative z-20 px-5 sm:px-8 md:px-16 pb-8 sm:pb-12 pt-4 flex flex-wrap justify-between items-end text-xs font-medium tracking-widest text-slate-500"
        >
          <div className="hidden sm:flex items-center gap-6 sm:gap-8 md:gap-12 uppercase text-[11px] text-slate-400">
            <span className="material-symbols-outlined text-base">
              chevron_left
            </span>
            <span className="material-symbols-outlined text-base -ml-4 sm:-ml-6 md:-ml-10">
              chevron_right
            </span>
            <a className="hover:text-white transition-colors" href="#">
              Facebook
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Twitter
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Instagram
            </a>
            <a className="hidden md:inline hover:text-white transition-colors" href="#">
              Pinterest
            </a>
            <a className="hidden md:inline hover:text-white transition-colors" href="#">
              Google+
            </a>
          </div>
          <div className="hidden md:flex gap-2 items-center text-[10px] text-slate-600">
            <span>LOCATED IN PALMETTO, FLORIDA</span>
            <span className="text-slate-700">|</span>
            <span>3505 US-41, PALMETTO, FL 34221</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Transition overlay — radial gradient fade */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 pointer-events-none z-30"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,17,17,0.8)_0%,rgba(17,17,17,0.95)_70%,rgba(17,17,17,1)_100%)]" />
      </motion.div>
    </section>
  );
}
