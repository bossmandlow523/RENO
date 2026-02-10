export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-renovo-charcoal text-renovo-earth py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/logo.png" alt="Renovo Resource Solutions" className="h-8 w-auto brightness-0 invert" />
          <p className="text-sm">
            &copy; {year} Renovo Resource Solutions. Serving Manatee County since 2017.
          </p>
        </div>
      </div>
    </footer>
  );
}
