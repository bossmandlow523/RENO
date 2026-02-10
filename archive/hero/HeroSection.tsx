const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/RenovoResourceSolutions" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/renovo-resource-solutions/" },
];

export default function HeroSection() {
  return (
    <section className="hero-section relative w-full bg-renovo-charcoal overflow-visible">
      {/* ── Hero image — drives the section height ── */}
      <img
        src="/hero-bg.png"
        alt="Renovo Resource Solutions recycling facility with hexagonal material photos"
        className="block w-full h-auto"
        loading="eager"
        fetchPriority="high"
      />

      {/* ── Content overlay — positioned on top of the image ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-20 pb-20 pt-24 overflow-visible">
        {/* ── Headline block — full width, not constrained ── */}
        <div className="mb-auto mt-[18%] overflow-visible">
          {/* Main heading — Montserrat per design system */}
          <h1 className="font-heading uppercase tracking-tight mb-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9]">
            <span className="block">WE</span>
            <span className="block">BUY</span>
            <span className="block">SCRAP</span>
          </h1>

          {/* Accent line */}
          <div className="w-16 h-[3px] bg-renovo-sand mt-5 mb-5 shadow-sm" />

          {/* Description — constrained width for readability */}
          <p className="text-sm sm:text-base md:text-lg text-white/85 italic leading-relaxed max-w-[400px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Central West Florida's premier recycling resource.
            Processing <strong className="text-white font-bold not-italic">1.5&nbsp;million pounds</strong> of
            material every month since 2017&nbsp;— fast, fair,
            and community&#8209;driven.
          </p>

          {/* ── CTA button — dark navy rounded pill ── */}
          <a
            href="#contact"
            className="hero-cta-btn inline-flex items-center justify-center mt-6 md:mt-8 px-8 py-3.5 bg-renovo-charcoal text-white font-bold text-sm md:text-base tracking-wider uppercase rounded-full hover:bg-renovo-charcoal/80 transition-colors"
          >
            Get a Quote
          </a>
        </div>

        {/* ── Bottom bar — social links ── */}
        <div className="mt-auto pt-8 flex items-center gap-2">
          <div className="flex items-center gap-4 mr-4 text-white/50">
            <button className="hover:text-white transition-colors text-lg">&lsaquo;</button>
            <button className="hover:text-white transition-colors text-lg">&rsaquo;</button>
          </div>
          <nav className="flex gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 border border-white/30 text-xs font-medium text-white/70 hover:text-white hover:border-white/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
