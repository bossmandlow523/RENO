const links = [
  { href: "#materials", label: "Materials" },
  { href: "#commercial", label: "Commercial" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-12 text-sm font-medium tracking-wide text-slate-300">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="hover:text-white transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
