import PartnerCard from "./PartnerCard";

export interface Partner {
  _id: string;
  name: string;
  description?: string;
  logoUrl?: string;
}

interface PartnerGridProps {
  partners: Partner[];
}

export default function PartnerGrid({ partners }: PartnerGridProps) {
  if (partners.length === 0) {
    return (
      <p className="text-center text-renovo-slate">
        Partner information coming soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {partners.map((partner) => (
        <PartnerCard
          key={partner._id}
          name={partner.name}
          description={partner.description}
          logoUrl={partner.logoUrl}
        />
      ))}
    </div>
  );
}
