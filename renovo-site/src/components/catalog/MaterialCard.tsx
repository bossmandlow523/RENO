import type { Material } from "./materials-data";

interface MaterialCardProps {
  material: Material;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div className="overflow-hidden metallic-border bg-surface-800">
      <img
        alt={material.name}
        src={material.image}
        loading="lazy"
        className="w-full h-auto block"
      />
    </div>
  );
}
