interface PartnerCardProps {
  name: string;
  description?: string;
  logoUrl?: string;
}

export default function PartnerCard({ name, description, logoUrl }: PartnerCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-renovo-earth/20 hover:shadow-md transition-shadow">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="h-16 w-auto object-contain mb-4"
          loading="lazy"
        />
      ) : (
        <div className="h-16 w-16 rounded-full bg-renovo-green/10 flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-renovo-green">
            {name.charAt(0)}
          </span>
        </div>
      )}
      <h3 className="font-heading font-semibold text-renovo-charcoal">{name}</h3>
      {description && (
        <p className="mt-2 text-sm text-renovo-slate text-center">{description}</p>
      )}
    </div>
  );
}
