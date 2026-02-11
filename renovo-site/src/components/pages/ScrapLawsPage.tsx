import { Link } from "react-router-dom";

const countyRequirements = [
  { icon: "badge", label: "Identification", text: "Current Gov-issued Photo ID" },
  { icon: "edit_document", label: "Verification", text: "Signature" },
  { icon: "add_a_photo", label: "Visual Record", text: "Photograph" },
  { icon: "fingerprint", label: "Biometrics", text: "Legible Thumbprint" },
];

const prohibitedActs = [
  { num: "01", title: "Time Restrictions", text: "No sales permitted before 7 a.m. or after 7 p.m.", icon: "schedule" },
  { num: "02", title: "Vehicle Requirement", text: "Every seller must arrive in a motor vehicle to complete a transaction.", icon: "local_shipping" },
  { num: "03", title: "Fixed Location", text: "Purchase of regulated metals may only occur at a fixed business location.", icon: "location_on" },
  { num: "04", title: "Seller Qualifications", text: "Seller must use real name, be 18+ years of age, and not be under the influence of drugs or alcohol.", icon: "person_check" },
];

export default function ScrapLawsPage() {
  return (
    <div className="payment-page-bg text-white min-h-screen">
      {/* Gradient accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-accent-200 via-accent-400 to-accent-500" />

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-28 lg:pt-32 pb-16">
        <header className="flex flex-col md:flex-row justify-between md:items-end border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="inline-block border-y border-accent-300/30 py-1.5 mb-5">
              <p className="text-accent-400 font-bold font-body tracking-[0.4em] text-[10px] uppercase">
                Florida Statutes &amp; Local Ordinances
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl leading-[0.85] uppercase tracking-tighter metal-angular font-display">
              Legal<br />Compliance
            </h1>
          </div>
          <div className="text-left md:text-right pb-2">
            <p className="font-display text-white text-lg font-black uppercase tracking-wider">
              F.S. Chapter 538
            </p>
            <p className="text-surface-400 text-sm max-w-sm mt-1">
              Governing scrap metal transactions at Renovo Resource Solutions.
            </p>
          </div>
        </header>
      </div>

      {/* Felony Warning */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 -mt-4 mb-16">
        <div className="border-l-4 border-red-500 bg-red-500/10 p-4 md:p-5 flex items-center gap-4 w-fit">
          <div className="shrink-0 size-14 flex items-center justify-center bg-red-500/15 border border-red-500/30 hidden md:flex">
            <span className="material-symbols-outlined text-3xl text-red-400">gavel</span>
          </div>
          <div>
            <p className="font-body font-bold text-[9px] tracking-[0.3em] text-red-400 uppercase mb-1">
              Criminal Penalty Notice — F.S. 538.23
            </p>
            <p className="text-lg md:text-xl font-black text-white leading-snug">
              False ownership verification is a{" "}
              <span className="text-red-400">Third Degree Felony</span>{" "}
              (under $300) or a{" "}
              <span className="text-red-400">Second Degree Felony</span>{" "}
              ($300+).
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Requirements */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-wide text-white flex items-center gap-4">
            <span className="material-symbols-outlined text-accent-400 text-3xl">fact_check</span>
            Transaction Requirements
          </h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-surface-400 text-sm mb-10 -mt-4">
          Manatee County <span className="text-accent-300 font-bold">Ordinance No. 12-13</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {countyRequirements.map((item) => (
            <div
              key={item.label}
              className="restricted-card p-5 text-center group hover:scale-[1.02] transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-4xl text-accent-400 mb-4 block"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}
              >
                {item.icon}
              </span>
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-accent-400 mb-1.5">
                {item.label}
              </p>
              <p className="text-sm font-black uppercase text-white font-display">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Enforcement Notice */}
        <div className="border-l-4 border-red-500 bg-red-950/40 p-5 md:p-6 flex items-center gap-4">
          <span className="material-symbols-outlined text-2xl text-red-400 shrink-0">emergency</span>
          <div>
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-red-400 mb-1">
              Enforcement Notice
            </p>
            <p className="text-sm font-bold text-white">
              Violations are a felony under F.S. 538.19 and a misdemeanor under Manatee County Code.
            </p>
          </div>
        </div>
      </section>

      {/* Prohibited Acts */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-wide text-white flex items-center gap-4">
            <span className="material-symbols-outlined text-accent-400 text-3xl">block</span>
            Prohibited Acts
          </h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-surface-400 text-sm mb-10 -mt-4">
          Statutory Operating Restrictions per <span className="text-accent-300 font-bold">F.S. 538.26</span>
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {prohibitedActs.map((act) => (
            <div
              key={act.num}
              className="restricted-card p-6 flex gap-5 group hover:scale-[1.01] transition-all duration-300"
            >
              <div className="shrink-0 flex flex-col items-center gap-3">
                <div className="size-12 flex items-center justify-center border border-accent-400/30 bg-accent-400/5">
                  <span
                    className="material-symbols-outlined text-2xl text-accent-400"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}
                  >
                    {act.icon}
                  </span>
                </div>
                <span className="text-2xl font-display text-accent-300/30 leading-none">{act.num}</span>
              </div>
              <div>
                <h4 className="font-display font-black text-lg uppercase mb-1.5 text-white">
                  {act.title}
                </h4>
                <p className="text-sm text-surface-300 font-bold">{act.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Documentation CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-8">
        <div className="relative p-1 bg-gradient-to-r from-accent-200 via-accent-400 to-accent-500">
          <div className="bg-surface-950 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <span className="material-symbols-outlined text-4xl text-accent-400">description</span>
              <div>
                <p className="font-body text-[9px] tracking-[0.3em] uppercase text-accent-400 mb-1">
                  Official Documentation
                </p>
                <span className="text-white text-xl font-black uppercase font-display">
                  Review Florida Statutes
                </span>
              </div>
            </div>
            <a
              href="http://www.leg.state.fl.us/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-400 px-10 py-4 text-black font-black text-[11px] uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap inline-flex items-center gap-2"
            >
              Open FL Senate Site
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <footer className="max-w-[1400px] mx-auto px-6 md:px-10 pt-6 pb-16">
        <div className="border-t border-surface-600/30 pt-6">
          <p className="font-body text-[9px] tracking-[0.2em] uppercase text-surface-500 mb-2">
            Legal Disclaimer
          </p>
          <p className="text-surface-500 text-xs leading-relaxed max-w-2xl italic">
            The information provided on this page is for informational purposes only and does not constitute legal advice. Renovo Resource Solutions encourages all sellers to consult with legal counsel regarding their specific situation and to stay informed of changes to Florida Statutes and Local Ordinances.
          </p>
        </div>
      </footer>
    </div>
  );
}
