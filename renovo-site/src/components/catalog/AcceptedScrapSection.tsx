import { useState } from "react";
import MaterialCard from "./MaterialCard";
import { materials, categories, type Category } from "./materials-data";

export default function AcceptedScrapSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  return (
    <section id="materials" className="relative industrial-bg overflow-hidden">
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex flex-col gap-2 mb-12 pl-6 relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-2 rounded-full"
            style={{
              background: "linear-gradient(180deg, #FFCC80 0%, #FF9933 40%, #FF7F00 100%)",
              boxShadow: "0 0 12px rgba(255, 127, 0, 0.4), 0 0 30px rgba(255, 127, 0, 0.15)",
            }}
          />
          <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase" style={{ fontFamily: "'Chonburi', cursive" }}>
            Accepted Scrap
          </h2>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <div className="flex items-center gap-3 bg-accent-300 px-6 py-3 skew-x-[-2deg] w-fit">
            <span className="text-surface-900 text-lg">⚠</span>
            <p className="text-surface-900 font-accent text-xs md:text-sm font-bold tracking-[0.15em] uppercase">
              Tip: Separate materials by type to maximize profits. Clean metals earn more!
            </p>
            <span className="text-surface-900 text-lg">⚠</span>
          </div>
          <button className="ml-auto px-6 py-2 font-display font-black text-sm skew-x-[-12deg] bg-red-700 border-2 border-red-500 text-white hover:bg-red-600 transition-colors whitespace-nowrap">
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
          {materials.map((material) => {
            const visible = activeCategory === "all" || material.category === activeCategory;
            return (
              <div key={material.name} className={visible ? "" : "hidden"}>
                <MaterialCard material={material} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
