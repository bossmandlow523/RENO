import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const lockedOnHero = scrollY < 50;
      const lockedOnMaterials = scrollY > vh - 50;

      setVisible(lockedOnHero || lockedOnMaterials);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-8 md:px-16 md:py-10 flex items-center justify-center transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Brand */}
      <a href="/" className="absolute left-8 md:left-16 flex items-center gap-2">
        <img
          src="/hero-logo.svg"
          alt="Renovo Resource Solutions"
          className="h-12 md:h-16 w-auto brightness-0 invert"
        />
        <div className="flex flex-col leading-none">
          <span className="font-heading font-extrabold text-[1.1rem] md:text-[1.4rem] tracking-wide uppercase metal-shimmer">
            Renovo
          </span>
          <span className="font-heading font-medium text-[0.47rem] md:text-[0.57rem] tracking-[0.25em] uppercase text-accent-300">
            Resource Solutions
          </span>
        </div>
      </a>

      {/* Nav — centered (hidden on mobile) */}
      <Navigation />

      {/* Icons — top right (hidden on mobile) */}
      <div className="absolute right-8 md:right-16 hidden md:flex items-center gap-2">
        <a
          href="tel:+19417219778"
          aria-label="Phone"
          className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white hover:bg-white/[0.12] hover:border-white/[0.12] transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[15px]">call</span>
        </a>
        <span
          aria-label="Fax"
          className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white hover:bg-white/[0.12] hover:border-white/[0.12] transition-all duration-200 cursor-default"
        >
          <span className="text-[8px] font-bold tracking-[0.05em] uppercase font-body">FAX</span>
        </span>
        <a
          href="https://www.facebook.com/RenovoResourceSolutions"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/[0.12] transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/renovo-resource-solutions/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/[0.12] transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="#0A66C2" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://share.google/YTbOyre8qlWy5ngYl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google"
          className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/[0.12] transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </a>
      </div>

    </header>
  );
}
