export type Category = "all" | "aluminum" | "copper" | "radiators" | "iron" | "steel" | "other";

export interface Material {
  name: string;
  category: Category;
  image: string;
}

export const categories: { label: string; value: Category }[] = [
  { label: "ALL_MATERIALS", value: "all" },
  { label: "ALUMINUM", value: "aluminum" },
  { label: "COPPER", value: "copper" },
  { label: "RADIATORS", value: "radiators" },
  { label: "IRON", value: "iron" },
  { label: "STEEL", value: "steel" },
  { label: "MISC", value: "other" },
];

export const materials: Material[] = [
  { name: "Aluminum Cans", category: "aluminum", image: "/whatwebuy/aluminum-cans.jpg" },
  { name: "Aluminum (Cast)", category: "aluminum", image: "/whatwebuy/aluminum-cast.jpg" },
  { name: "Aluminum ACSR", category: "aluminum", image: "/whatwebuy/aluminum-acsr.jpg" },
  { name: "Aluminum Clip - MLC", category: "aluminum", image: "/whatwebuy/aluminum-clip-mlc.jpg" },
  { name: "Aluminum Copper Cutoffs", category: "aluminum", image: "/whatwebuy/aluminum-copper-cutoffs.jpg" },
  { name: "Aluminum Doors and Windows", category: "aluminum", image: "/whatwebuy/aluminum-doors-and-windows.jpg" },
  { name: "Aluminum EC Wire", category: "aluminum", image: "/whatwebuy/aluminum-ec-wire.jpg" },
  { name: "Aluminum EC Wire (Insulated)", category: "aluminum", image: "/whatwebuy/aluminum-ec-wire-insulated.jpg" },
  { name: "Aluminum Extrusion", category: "aluminum", image: "/whatwebuy/aluminum-extrusion.jpg" },
  { name: "Aluminum Sheet", category: "aluminum", image: "/whatwebuy/aluminum-sheet.jpg" },
  { name: "Aluminum Turnings", category: "aluminum", image: "/whatwebuy/aluminum-turnings.jpg" },
  { name: "Aluminum Wheels", category: "aluminum", image: "/whatwebuy/aluminum-wheels.jpg" },
  { name: "Irony Aluminum", category: "aluminum", image: "/whatwebuy/irony-aluminum.jpg" },
  { name: "Bare Bright Copper", category: "copper", image: "/whatwebuy/bare-bright-copper.jpg" },
  { name: "Copper #1", category: "copper", image: "/whatwebuy/copper-1.jpg" },
  { name: "Copper #1 - Insulated Wire", category: "copper", image: "/whatwebuy/copper-1-insulated-wire.jpg" },
  { name: "Copper #2", category: "copper", image: "/whatwebuy/copper-2.jpg" },
  { name: "Copper - Sheet", category: "copper", image: "/whatwebuy/copper-sheet.jpg" },
  { name: "Aluminum Copper Radiators", category: "radiators", image: "/whatwebuy/aluminum-copper-radiators.jpg" },
  { name: "Aluminum Copper Radiators - Dirty", category: "radiators", image: "/whatwebuy/aluminum-copper-radiators-dirty.jpg" },
  { name: "Copper Aluminum Radiators", category: "radiators", image: "/whatwebuy/copper-aluminum-radiators.jpg" },
  { name: "Copper Brass Radiators", category: "radiators", image: "/whatwebuy/copper-brass-radiators.jpg" },
  { name: "Radiators - Clean", category: "radiators", image: "/whatwebuy/radiators-clean.jpg" },
  { name: "Cast Iron", category: "iron", image: "/whatwebuy/cast-iron.jpg" },
  { name: "Miscellaneous Iron - Shredder Feed", category: "iron", image: "/whatwebuy/miscellaneous-iron-shredder-feed.jpg" },
  { name: "Scrap Iron - Prepared", category: "iron", image: "/whatwebuy/scrap-iron-prepared.jpg" },
  { name: "Stainless Steel", category: "steel", image: "/whatwebuy/stainless-steel.jpg" },
  { name: "Steel Turnings", category: "steel", image: "/whatwebuy/steel-turnings.jpg" },
  { name: "Batteries", category: "other", image: "/whatwebuy/batteries.jpg" },
  { name: "Electric Motors - Large", category: "other", image: "/whatwebuy/electric-motors-large.jpg" },
  { name: "Electric Motors - Small", category: "other", image: "/whatwebuy/electric-motors-small.jpg" },
  { name: "Lead", category: "other", image: "/whatwebuy/lead.jpg" },
  { name: "Lead Wheel Weights", category: "other", image: "/whatwebuy/lead-wheel-weights.jpg" },
  { name: "Sealed Units", category: "other", image: "/whatwebuy/sealed-units.jpg" },
  { name: "Yellow Brass", category: "other", image: "/whatwebuy/yellow-brass.jpg" },
  { name: "Zinc", category: "other", image: "/whatwebuy/zinc.jpg" },
];
