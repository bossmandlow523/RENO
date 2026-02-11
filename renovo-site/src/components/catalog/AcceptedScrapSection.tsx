import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import MaterialCard from "./MaterialCard";
import { materials, categories, type Category, type Material } from "./materials-data";

export default function AcceptedScrapSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selected, setSelected] = useState<Material | null>(null);
  const navigate = useNavigate();

  const closeLightbox = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selected, closeLightbox]);

  const filtered = materials.filter(
    (m) => activeCategory === "all" || m.category === activeCategory
  );

  return (
    <section
      id="materials"
      className="relative overflow-hidden"
    >
      <div
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24"
        style={{
          background: "rgba(10, 10, 10, 0.55)",
          backdropFilter: "blur(20px) saturate(1.3)",
          WebkitBackdropFilter: "blur(20px) saturate(1.3)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="flex flex-col gap-2 mb-12 pl-6 relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-2 rounded-full"
            style={{
              background: "linear-gradient(180deg, #FFCC80 0%, #FF9933 40%, #FF7F00 100%)",
              boxShadow: "0 0 12px rgba(255, 127, 0, 0.4), 0 0 30px rgba(255, 127, 0, 0.15)",
            }}
          />
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter leading-none uppercase text-white font-display">
            Accepted Scrap
          </h2>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <div className="flex items-center gap-3 bg-accent-300 px-6 py-3 skew-x-[-2deg] w-fit">
            <span className="text-surface-900 text-lg">⚠</span>
            <p className="text-surface-900 font-body text-xs md:text-sm font-bold tracking-[0.15em] uppercase">
              Tip: Separate materials by type to maximize profits. Clean metals earn more!
            </p>
            <span className="text-surface-900 text-lg">⚠</span>
          </div>
          <button
            onClick={() => navigate("/restricted-materials")}
            className="ml-auto px-6 py-2 font-display font-black text-sm skew-x-[-12deg] bg-red-700 border-2 border-red-500 text-white hover:bg-red-600 transition-colors whitespace-nowrap"
          >
            <span className="inline-block skew-x-[12deg]">RESTRICTED_MATERIALS <span className="inline-block text-lg leading-none align-middle">▸▸</span></span>
          </button>
        </div>

        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide px-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-8 py-3 font-display font-black text-lg skew-x-[-12deg] transition-colors ${
                  activeCategory === cat.value
                    ? "bg-accent-300 text-surface-900"
                    : "bg-surface-800 border-2 border-surface-600 text-surface-400 hover:border-accent-300 hover:text-white"
                }`}
              >
                <span className="inline-block skew-x-[12deg]">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((material) => (
            <MaterialCard key={material.name} material={material} onClick={() => setSelected(material)} />
          ))}
        </div>
      </div>

      {/* Lightbox — portaled to body so it sits above the fixed header */}
      {selected && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col metallic-border bg-surface-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-auto flex-1">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-auto block"
              />
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-surface-700">
              <p className="font-display font-black text-lg uppercase tracking-wide text-white">
                {selected.name}
              </p>
              <button
                onClick={closeLightbox}
                className="text-surface-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
