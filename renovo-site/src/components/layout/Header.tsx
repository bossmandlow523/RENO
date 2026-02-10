import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-8 py-8 md:px-16 md:py-10 flex items-center justify-center">
      {/* Brand */}
      <div className="absolute left-8 md:left-16 flex items-center gap-2">
        <img
          src="/hero-logo.svg"
          alt="Renovo Resource Solutions"
          className="h-12 md:h-16 w-auto brightness-0 invert"
        />
        <div className="flex flex-col leading-none">
          <span className="font-heading font-extrabold text-navy-700 text-[1.1rem] md:text-[1.4rem] tracking-wide uppercase">
            Renovo
          </span>
          <span className="font-heading font-medium text-renovo-green-light text-[0.45rem] md:text-[0.55rem] tracking-[0.25em] uppercase">
            Resource Solutions
          </span>
        </div>
      </div>

      {/* Nav — centered (hidden on mobile) */}
      <Navigation />

    </header>
  );
}
