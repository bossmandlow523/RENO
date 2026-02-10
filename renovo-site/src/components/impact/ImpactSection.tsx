import ImpactStats from "./ImpactStats";

export default function ImpactSection() {
  return (
    <section id="impact" className="py-20 bg-renovo-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-renovo-green-dark">
            Our Impact
          </h2>
          <p className="mt-4 text-lg text-renovo-slate max-w-2xl mx-auto">
            From a small operation to processing 1.5 million pounds per month —
            built on community partnerships and a commitment to Manatee County.
          </p>
        </div>
        <ImpactStats />
      </div>
    </section>
  );
}
