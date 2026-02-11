import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { href: "#materials", label: "Materials", type: "hash" as const },
  { href: "/our-team", label: "Our Team", type: "path" as const },
  { href: "/scrap-laws", label: "Scrap Laws", type: "path" as const },
  { href: "/payment-policy", label: "Payment", type: "path" as const },
  { href: "/contact", label: "Contact", type: "path" as const },
];

const socialLinks = [
  { href: "https://www.facebook.com/RenovoResourceSolutions", label: "Facebook", icon: "group" },
  { href: "https://www.linkedin.com/company/renovo-resource-solutions/", label: "LinkedIn", icon: "work" },
  { href: "https://share.google/YTbOyre8qlWy5ngYl", label: "Google", icon: "star" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  function handleHashClick(e: React.MouseEvent, hash: string) {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#" + hash);
    }
  }

  return (
    <footer className="relative bg-surface-950 text-white overflow-hidden">
      {/* Orange gradient top border */}
      <div
        className="h-[2px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #FFCC80 20%, #FF9933 50%, #FF7F00 80%, transparent 100%)",
          boxShadow: "0 0 20px rgba(255, 127, 0, 0.3), 0 0 60px rgba(255, 127, 0, 0.1)",
        }}
      />

      {/* Decorative hex — background motif */}
      <div className="absolute top-12 right-[-60px] w-[200px] h-[200px] hexagon bg-white/[0.015] pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[10%] w-[120px] h-[120px] hexagon bg-white/[0.01] pointer-events-none" />

      {/* Main footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6 group">
              <img
                src="/hero-logo.svg"
                alt="Renovo Resource Solutions"
                className="h-10 w-auto brightness-0 invert group-hover:brightness-100 transition-all duration-300"
              />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-[1rem] tracking-wide uppercase metal-shimmer">
                  Renovo
                </span>
                <span className="font-heading font-medium text-[0.4rem] tracking-[0.25em] uppercase text-surface-400">
                  Resource Solutions
                </span>
              </div>
            </a>
            <p className="text-sm text-surface-400 font-body font-light leading-relaxed max-w-[260px] border-l-2 border-surface-700 pl-4">
              Manatee County's premier recycling center. Turning industrial debris into profit since 2017.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-surface-300 mb-5 flex items-center gap-3">
              Navigate
              <span
                className="flex-1 h-px max-w-[60px]"
                style={{ background: "linear-gradient(90deg, #FF9933, transparent)" }}
              />
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) =>
                link.type === "hash" ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleHashClick(e, link.href.replace("#", ""))}
                    className="text-sm font-body text-surface-400 hover:text-white transition-colors duration-200 w-fit"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm font-body text-surface-400 hover:text-white transition-colors duration-200 w-fit"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-surface-300 mb-5 flex items-center gap-3">
              Contact
              <span
                className="flex-1 h-px max-w-[60px]"
                style={{ background: "linear-gradient(90deg, #FF9933, transparent)" }}
              />
            </h4>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=3324+63rd+Ave+E,+Bradenton,+FL+34203"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="material-symbols-outlined text-lg text-surface-500 group-hover:text-accent-400 transition-colors mt-0.5">
                  location_on
                </span>
                <span className="text-sm font-body text-surface-400 group-hover:text-white transition-colors leading-relaxed">
                  3324 63rd Ave E<br />Bradenton, FL 34203
                </span>
              </a>
              <span className="block h-px w-full" style={{ background: "linear-gradient(90deg, rgba(255,153,51,0.3), transparent 60%)" }} />
              <a
                href="tel:9417270177"
                className="flex items-center gap-3 group"
              >
                <span className="material-symbols-outlined text-lg text-surface-500 group-hover:text-accent-400 transition-colors">
                  call
                </span>
                <span className="text-sm font-body text-surface-400 group-hover:text-white transition-colors">
                  (941) 727-0177
                </span>
              </a>
              <span className="block h-px w-full" style={{ background: "linear-gradient(90deg, rgba(255,153,51,0.3), transparent 60%)" }} />
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg text-surface-500 mt-0.5">
                  schedule
                </span>
                <div className="text-sm font-body text-surface-500 leading-relaxed">
                  <p className="text-surface-400">Mon–Fri 8am – 5pm</p>
                  <p>Sat 8am – 2pm</p>
                  <p className="text-[11px] text-surface-600 mt-1">Last load 10 min before close</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 — Connect */}
          <div>
            <h4 className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-surface-300 mb-5 flex items-center gap-3">
              Follow Us
              <span
                className="flex-1 h-px max-w-[60px]"
                style={{ background: "linear-gradient(90deg, #FF9933, transparent)" }}
              />
            </h4>
            <div className="flex flex-col gap-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group w-fit"
                >
                  <span className="material-symbols-outlined text-lg text-surface-500 group-hover:text-accent-400 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-sm font-body text-surface-400 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
            <span className="block h-px w-full mb-4" style={{ background: "linear-gradient(90deg, rgba(255,153,51,0.3), transparent 60%)" }} />
            <a
              href="tel:9417270177"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm text-surface-300 hover:text-white hover:border-accent-500/30 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-base text-accent-400 group-hover:text-accent-300 transition-colors">
                call
              </span>
              <span className="font-body text-[9px] font-bold tracking-[0.15em] uppercase">
                Call Us
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-body text-surface-600 tracking-wide">
            &copy; {year} Renovo Resource Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-body text-surface-600">
            <span className="font-body text-[8px] tracking-[0.2em] uppercase text-surface-700">
              Bradenton, Florida
            </span>
            <span className="text-surface-800">|</span>
            <span className="font-body text-[8px] tracking-[0.2em] uppercase text-surface-700">
              Recycling Solutions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
