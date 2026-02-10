import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between industrial-bg overflow-x-clip">
      {/* Accent glow — subtle orange atmospheric wash */}
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-accent-500/[0.04] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex-grow px-5 sm:px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-0 pt-28 sm:pt-32 md:pt-8">
        {/* Left — Text */}
        <div className="w-full md:w-[45%] flex flex-col items-start relative pl-1 sm:pl-4 md:pl-12">
          {/* "We Buy" — slides in from left */}
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-2xl sm:text-3xl md:text-5xl font-black tracking-wide mb-2 uppercase"
            style={{
              fontFamily: "'Chonburi', cursive",
              backgroundImage:
                "linear-gradient(90deg, #FFB74D 0%, #FFCC80 25%, #FF9933 50%, #FF7F00 75%, #CC4000 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              filter: "drop-shadow(0 2px 10px rgba(255, 127, 0, 0.4))",
            }}
          >
            We Buy
          </motion.h2>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase tracking-tighter text-white mb-6 sm:mb-8" style={{ fontFamily: "'Chonburi', cursive" }}>
            {/* "Scrap" — rises up with animated underline */}
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
              {/* Animated underline — draws from left in brand orange with glow */}
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
            {/* "Metal" — rises up with gradient text */}
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

          {/* Description */}
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

          {/* Trust Badges */}
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
        <div className="w-full md:w-[55%] relative h-[340px] sm:h-[450px] md:h-[600px] flex items-center justify-center translate-x-0 sm:translate-x-4 md:translate-x-12">
          {/* Main hexagonal image with liquid glass outline */}
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

          {/* WE ARE OPEN + GET DIRECTIONS — Navy hexagon */}
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

          {/* WHAT WE BUY — Navy hexagon */}
          <motion.a
            href="#materials"
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
      </div>

      {/* Hero Footer Bar */}
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
    </section>
  );
}
