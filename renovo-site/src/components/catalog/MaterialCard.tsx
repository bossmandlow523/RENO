import type { Material } from "./materials-data";

interface MaterialCardProps {
  material: Material;
  onClick: () => void;
}

export default function MaterialCard({ material, onClick }: MaterialCardProps) {
  return (
    <div
      className="overflow-hidden border border-surface-600 hover:border-accent-400 cursor-pointer transition-colors duration-200"
      onClick={onClick}
    >
      <div className="aspect-[4/3] bg-surface-900">
        <img
          alt={material.name}
          src={material.image}
          loading="lazy"
          className="w-full h-full object-contain block"
        />
      </div>
    </div>
  );
}
