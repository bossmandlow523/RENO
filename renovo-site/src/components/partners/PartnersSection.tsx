import PartnerGrid from "./PartnerGrid";
import type { Partner } from "./PartnerGrid";

// TODO: Replace with Wix CMS fetch once collections are set up
const placeholderPartners: Partner[] = [
  { _id: "1", name: "Manatee Metals", description: "Scrap metal processing partner" },
  { _id: "2", name: "Gulf Coast Recycling", description: "Regional material recovery" },
  { _id: "3", name: "Bradenton Building Supply", description: "Construction waste diversion" },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-renovo-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-renovo-green-dark">
            Our Partners
          </h2>
          <p className="mt-4 text-lg text-renovo-slate max-w-2xl mx-auto">
            Deep-rooted partnerships with local businesses drive our growth and
            strengthen the Manatee County community.
          </p>
        </div>
        <PartnerGrid partners={placeholderPartners} />
      </div>
    </section>
  );
}
