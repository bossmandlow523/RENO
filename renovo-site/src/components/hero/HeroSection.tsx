import { useRef, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const badges = [
  { src: "/badges/bbb-accredited.png", alt: "BBB Accredited Business A+" },
  { src: "/badges/isri-member.jpeg", alt: "ISRI Member" },
  { src: "/badges/bbc-member.jpeg", alt: "Better Business Council Member" },
  { src: "/badges/manatee-chamber.png", alt: "Manatee Chamber of Commerce Member" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;
    if (window.innerWidth < 768) return;

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
      className="relative min-h-screen md:h-screen overflow-x-clip"
    >
      {/* ═══ BASE ═══ */}
      <div className="absolute inset-0 bg-[#060606]" />

      {/* ═══ MOBILE: Full-bleed image background ═══ */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="/hero-scrapyard.jpeg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.1) saturate(0.8)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,6,6,0.5) 0%, rgba(6,6,6,0.82) 45%, #060606 75%)",
          }}
        />
      </div>

      {/* ═══ DESKTOP: Right image panel — diagonal clip ═══ */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full hidden md:block"
        style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <img
          src="/hero-scrapyard.jpeg"
          alt="Scrap metal yard — copper wire, aluminum cans, steel beams, brass fittings"
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.08) saturate(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #060606 0%, transparent 35%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,6,6,0.5) 0%, transparent 30%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,6,6,0.3) 0%, transparent 15%)",
          }}
        />
      </div>

      {/* ═══ DIAGONAL EDGE GLOW ═══ */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full hidden md:block pointer-events-none z-[15]"
        style={{
          clipPath: "polygon(14.5% 0, 17% 0, 2% 100%, -0.5% 100%)",
          background:
            "linear-gradient(to bottom, transparent 5%, rgba(255,127,0,0.06) 25%, rgba(255,127,0,0.1) 50%, rgba(255,127,0,0.06) 75%, transparent 95%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[50%] h-full hidden md:block pointer-events-none z-[16]"
        style={{
          clipPath: "polygon(15% 0, 15.2% 0, 0.2% 100%, 0% 100%)",
          background:
            "linear-gradient(to bottom, transparent 10%, rgba(255,153,51,0.4) 30%, rgba(255,127,0,0.6) 50%, rgba(255,153,51,0.4) 70%, transparent 90%)",
        }}
      />

      {/* ═══ AMBIENT GLASS EFFECTS ═══ */}
      <div
        className="absolute top-[-15%] left-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,127,0,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(27,58,92,0.1) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute top-[30%] left-[35%] w-[300px] h-[300px] rounded-full pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,204,128,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Grain */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{ opacity: 0.025, mixBlendMode: "overlay" }}
      >
        <filter id="hero-grain-v2">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain-v2)" />
      </svg>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1 flex items-end md:items-center px-6 sm:px-10 md:px-16 pt-28 sm:pt-32 md:pt-24 pb-8 md:pb-0">
          <div className="w-full md:w-[52%] flex flex-col gap-5 md:gap-6">
            {/* ── Label ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="relative font-heading text-lg md:text-2xl font-medium uppercase tracking-[0.35em] text-accent-400"
            >
              We Buy
            </motion.div>

            {/* ── Headline ── */}
            <div className="-mt-3">
              <h1 className="font-display text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] uppercase tracking-tighter text-white">
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease }}
                  className="block"
                  style={{
                    filter: "drop-shadow(0 2px 10px rgba(200,200,210,0.15))",
                  }}
                >
                  Scrap
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease }}
                  className="block metal-shimmer"
                  style={{
                    filter: "drop-shadow(0 2px 10px rgba(200,200,210,0.15))",
                    animationDelay: "6s",
                  }}
                >
                  Metal
                </motion.span>
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-[3px] md:h-1 w-24 md:w-40 origin-left mt-3 md:mt-4"
                style={{
                  background:
                    "linear-gradient(90deg, #FF7F00, #FF9933 60%, #FFCC80)",
                  boxShadow:
                    "0 0 16px rgba(255,127,0,0.4), 0 0 40px rgba(255,127,0,0.15)",
                }}
              />
            </div>

            {/* ── Description ── */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="text-xs sm:text-sm text-surface-300 font-body font-normal leading-relaxed max-w-lg"
            >
              Welcome to Renovo Resource Solutions, a recycling center in
              Manatee County. Since opening in 2017, we have evolved from
              processing a few thousand pounds of material each month to 1.5
              million pounds, driven by strong partnerships with local
              businesses and our dedication to the community. We are committed
              to delivering exceptional customer service for residential and
              commercial clients alike, averaging under 7 minutes per visit
              with capacity for 20 customers at once, all while maintaining the
              highest standards of compliance and cleanliness.
            </motion.p>

            {/* ── Badges ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease }}
              className="flex items-center gap-2 sm:gap-3"
            >
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.alt}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.05 + i * 0.1,
                    ease,
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center hover:scale-105 transition-transform duration-300"
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
        </div>

        {/* ── CTA ── */}
        <motion.a
          href="#materials"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            document
              .getElementById("materials")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3, ease }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 group cursor-pointer"
        >
          <span className="inline-block skew-x-[-12deg] border border-white/25 hover:border-accent-400/60 px-5 py-2.5 transition-colors duration-300">
            <span className="inline-flex items-center gap-2 skew-x-[12deg] font-display text-sm font-black tracking-wide text-white/90 group-hover:text-accent-400 transition-colors duration-300">
              WHAT WE BUY
              <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform duration-200">
                arrow_downward
              </span>
            </span>
          </span>
        </motion.a>

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="px-6 sm:px-10 md:px-16 pb-6 sm:pb-8 flex justify-between items-end"
        >
          <div className="hidden md:flex items-center gap-2 text-[10px] text-white/60 font-body tracking-wider">
            <span className="material-symbols-outlined text-accent-400 text-sm">schedule</span>
            <span className="text-white">MON–FRI 8AM–5PM</span>
            <span className="text-surface-500 text-[9px]">LAST LOAD 4:50PM</span>
            <span className="text-surface-600">·</span>
            <span className="text-white">SAT 8AM–2PM</span>
            <span className="text-surface-500 text-[9px]">LAST LOAD 1:50PM</span>
          </div>
          <div className="hidden md:flex gap-2 items-center text-[10px] text-white font-body tracking-wider">
            <span>LOCATED IN BRADENTON, FLORIDA</span>
            <span className="text-surface-700">|</span>
            <span>3324 63RD AVE E, BRADENTON, FL 34203</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
