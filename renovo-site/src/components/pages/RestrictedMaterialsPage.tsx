import { useState } from "react";

type Category = "all" | "municipal" | "industrial" | "utility" | "automotive";

interface RestrictedMaterial {
  ref: string;
  icon: string;
  name: string;
  description: string;
  category: Category;
}

const materials: RestrictedMaterial[] = [
  { ref: "538.26(5)(b)1", icon: "radio_button_checked", name: "Manhole Covers", description: "Restricted municipal property. Proof of ownership required.", category: "municipal" },
  { ref: "538.26(5)(b)2", icon: "light", name: "Utility Poles & Fixtures", description: "Electric light poles or other utility structures and their fixtures, wires, and hardware.", category: "utility" },
  { ref: "538.26(5)(b)3", icon: "reorder", name: "Guard Rails", description: "Highway guard rails. Proof of ownership or authorization to sell required.", category: "municipal" },
  { ref: "538.26(5)(b)4", icon: "warning", name: "Traffic Signs & Signals", description: "Street signs, traffic signs, or traffic signals and their fixtures and hardware.", category: "municipal" },
  { ref: "538.26(5)(b)5", icon: "electrical_services", name: "Utility Wire & Bus Bars", description: "Communication, transmission, distribution, and service wire from a utility, including copper or aluminum bus bars, connectors, grounding plates, or grounding wire.", category: "utility" },
  { ref: "538.26(5)(b)6", icon: "history", name: "Funeral Markers & Vases", description: "Funeral markers or funeral vases. Proof of ownership required.", category: "municipal" },
  { ref: "538.26(5)(b)7", icon: "history_edu", name: "Historical Markers", description: "Historical markers are restricted regulated metals property.", category: "municipal" },
  { ref: "538.26(5)(b)8", icon: "train", name: "Railroad Equipment", description: "Tie plates, signal houses, control boxes, switch plates, E clips, rail tie junctions, and other railroad equipment.", category: "industrial" },
  { ref: "538.26(5)(b)9", icon: "verified", name: "Marked Metal Items", description: "Any metal item observably marked with the name, initials, or logo of a governmental entity, utility company, cemetery, or railroad.", category: "municipal" },
  { ref: "538.26(5)(b)10", icon: "ac_unit", name: "HVAC Coils", description: "Copper, aluminum, or aluminum-copper condensing or evaporator coils from AC or heating units. Excludes window units and motor vehicle units.", category: "industrial" },
  { ref: "538.26(5)(b)11", icon: "propane_tank", name: "Propane Containers", description: "Aluminum or stainless steel containers or bottles designed to hold propane for fueling forklifts.", category: "industrial" },
  { ref: "538.26(5)(b)12", icon: "liquor", name: "Stainless Steel Beer Kegs", description: "Stainless steel beer kegs. Proof of ownership required.", category: "industrial" },
  { ref: "538.26(5)(b)13", icon: "settings_input_component", name: "Catalytic Converters", description: "Catalytic converters or any nonferrous part thereof, unless purchased as part of a complete motor vehicle.", category: "automotive" },
  { ref: "538.26(5)(b)14", icon: "bolt", name: "Burned Wire", description: "Metallic wire that has been burned in whole or in part to remove insulation.", category: "utility" },
  { ref: "538.26(5)(b)15", icon: "water_damage", name: "FDC Valves", description: "Brass or bronze fire department connection and control valves commonly used on structures for fire extinguishing water access.", category: "utility" },
  { ref: "538.26(5)(b)16", icon: "valve", name: "Backflow Preventers", description: "Brass or bronze commercial potable water backflow preventer valves used to prevent backflow from commercial structures into municipal water systems.", category: "utility" },
  { ref: "538.26(5)(b)17", icon: "shopping_cart", name: "Shopping Carts", description: "Shopping carts are restricted regulated metals property. Proof of ownership required.", category: "municipal" },
  { ref: "538.26(5)(b)18", icon: "speed", name: "Brass Water Meters", description: "Brass water meters. Proof of ownership required.", category: "utility" },
  { ref: "538.26(5)(b)19", icon: "grid_view", name: "Storm Grates", description: "Storm grates. Proof of ownership or authorization to sell required.", category: "municipal" },
  { ref: "538.26(5)(b)20", icon: "grass", name: "Brass Sprinkler Heads", description: "Brass sprinkler heads used in commercial agriculture.", category: "industrial" },
  { ref: "538.26(5)(b)21", icon: "battery_full", name: "Lead-Acid Batteries", description: "More than two lead-acid batteries, or any part or component thereof, in a single purchase or from the same individual in a single day.", category: "automotive" },
];

const categories: { label: string; value: Category }[] = [
  { label: "All Materials", value: "all" },
  { label: "Municipal", value: "municipal" },
  { label: "Industrial", value: "industrial" },
  { label: "Utility", value: "utility" },
  { label: "Automotive", value: "automotive" },
];

export default function RestrictedMaterialsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all"
    ? materials
    : materials.filter((m) => m.category === activeCategory);

  return (
    <div className="catalog-bg min-h-screen">
      {/* Gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-accent-200 via-accent-400 to-accent-500" />

      {/* Page header */}
      <header className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-8 border-b border-white/10">
        <p className="font-accent font-bold text-[10px] tracking-[0.2em] text-accent-400 mb-4">
          SCRAP RECYCLING OPERATIONS
        </p>
        <h1
          className="text-6xl md:text-7xl lg:text-8xl leading-[0.9] uppercase tracking-tighter metal-shimmer mb-5"
          style={{ fontFamily: "'Chonburi', cursive" }}
        >
          RESTRICTED<br />MATERIALS
        </h1>
        <p className="font-accent font-bold text-[11px] tracking-[0.15em] text-accent-400">
          FLORIDA STATUTE 538.26 COMPLIANCE
        </p>
      </header>

      {/* Documentation Protocol */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-display font-black text-xl uppercase tracking-widest text-white">
              Documentation Protocol
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 metallic-border bg-surface-900/50">
              <span className="material-symbols-outlined text-4xl text-accent-300 mb-4 block" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                badge
              </span>
              <h3 className="font-display font-black text-lg uppercase mb-3 text-white">
                U.S. Government ID
              </h3>
              <p className="font-bold text-sm text-surface-400">
                Valid State-issued ID, Driver's License, or Passport required for every transaction per §538.26. Digital copies not accepted.
              </p>
            </div>
            <div className="p-8 metallic-border bg-surface-900/50">
              <span className="material-symbols-outlined text-4xl text-accent-300 mb-4 block" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                description
              </span>
              <h3 className="font-display font-black text-lg uppercase mb-3 text-white">
                Proof of Ownership
              </h3>
              <p className="font-bold text-sm text-surface-400">
                Reasonable proof of ownership required — receipt, bill of sale, or equivalent documentation for all restricted categories.
              </p>
            </div>
            <div className="p-8 metallic-border bg-surface-900/50">
              <span className="material-symbols-outlined text-4xl text-accent-300 mb-4 block" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                corporate_fare
              </span>
              <h3 className="font-display font-black text-lg uppercase mb-3 text-white">
                Letter of Auth
              </h3>
              <p className="font-bold text-sm text-surface-400">
                Signed letter on the owner's letterhead, dated no later than 90 days before the sale, authorizing the seller to sell on behalf of the owner.
              </p>
            </div>
          </div>
        </section>

        {/* Category filter tabs */}
        <nav className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`-skew-x-12 px-6 py-2.5 text-sm font-display font-black uppercase tracking-wider transition-transform hover:scale-105 ${
                activeCategory === cat.value
                  ? "bg-accent-300 text-black"
                  : "border border-white/20 text-white hover:border-accent-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Material cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((material) => (
            <div
              key={material.ref}
              className="aspect-square restricted-card p-6 flex flex-col justify-between group hover:scale-[1.02] cursor-pointer transition-all duration-300"
              style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
            >
              <div className="flex justify-between items-start">
                <span
                  className="material-symbols-outlined text-4xl text-surface-400 group-hover:text-accent-300 transition-colors duration-300"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}
                >
                  {material.icon}
                </span>
                <span className="font-accent text-[9px] font-bold text-accent-300/60 group-hover:text-accent-300 tracking-widest transition-colors duration-300">
                  REF: {material.ref}
                </span>
              </div>
              <div>
                <h4 className="font-display font-black text-xl uppercase mb-1.5 text-white group-hover:text-accent-200 transition-colors duration-300">
                  {material.name}
                </h4>
                <p className="font-bold text-xs text-surface-400 group-hover:text-surface-200 transition-colors duration-300">
                  {material.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Verification CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="relative p-1 bg-gradient-to-r from-accent-200 via-accent-400 to-accent-500">
          <div className="bg-surface-950 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2
                className="text-3xl md:text-4xl text-white uppercase mb-3"
                style={{ fontFamily: "'Chonburi', cursive" }}
              >
                Verification Required?
              </h2>
              <p className="font-bold text-sm text-surface-400 max-w-xl">
                Contact our compliance officers for pre-load assessment. We can verify material eligibility via high-res digital submissions to avoid gate delays.
              </p>
            </div>
            <button className="bg-accent-300 text-black px-10 py-4 font-display font-black text-sm uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap">
              Speak to Compliance
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
