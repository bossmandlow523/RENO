import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const links = [
  { href: "#materials", label: "Materials", type: "hash" as const },
  { href: "/restricted-materials", label: "Restricted", type: "path" as const },
  { href: "/our-team", label: "Our Team", type: "path" as const },
  { href: "/scrap-laws", label: "Scrap Laws", type: "path" as const },
  { href: "/payment-policy", label: "Payment", type: "path" as const },
  { href: "/contact", label: "Contact", type: "path" as const },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleHashClick(e: React.MouseEvent, hash: string) {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#" + hash);
    }
  }

  function renderLink(link: (typeof links)[number], mobile = false) {
    const baseClass = mobile
      ? "block py-3 text-lg font-medium tracking-wide transition-colors"
      : "font-body text-[10px] font-bold tracking-[0.15em] leading-none hover:text-accent-300 transition-colors";

    if (link.type === "hash") {
      const hash = link.href.replace("#", "");
      const isActive =
        location.pathname === "/" && location.hash === link.href;
      return (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleHashClick(e, hash)}
          className={`${baseClass} ${isActive ? "text-accent-300" : mobile ? "text-slate-300 hover:text-white" : "text-white"}`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <NavLink
        key={link.href}
        to={link.href}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `${baseClass} ${isActive ? "text-accent-300" : mobile ? "text-slate-300 hover:text-white" : "text-white"}`
        }
      >
        {link.label}
      </NavLink>
    );
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6 uppercase text-white px-8 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {links.map((link, i) => (
          <React.Fragment key={link.href}>
            {renderLink(link)}
            {i < links.length - 1 && (
              <span className="w-px h-3 bg-white/20" />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Mobile hamburger + Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden absolute right-8 text-white p-2">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-surface-900 border-surface-700 w-[280px]"
        >
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 mt-8">
            {links.map((link) => renderLink(link, true))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
