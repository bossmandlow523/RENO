import { Link } from "react-router-dom";

export default function PaymentPolicyPage() {
  return (
    <div className="payment-page-bg text-white min-h-screen">
      {/* Hero */}
      <div className="max-w-[1200px] mx-auto px-6 pt-28 lg:pt-32 pb-12 lg:pb-16 text-center">
        <div className="inline-block border-y border-accent-300/30 py-1.5 mb-4">
          <p className="text-accent-400 font-bold font-body tracking-[0.4em] text-[10px] uppercase">
            Payment Methods Policy V3
          </p>
        </div>
        <h1
          className="text-white uppercase text-4xl lg:text-7xl mb-5 leading-[0.9] font-display"
        >
          How You <br />
          <span className="text-accent-400">Get Paid</span>
        </h1>
        <p className="text-base text-surface-400 max-w-xl mx-auto font-display uppercase tracking-wider">
          Industrial standard payout structures ensuring 100% regulatory
          compliance and secure fund distribution.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 px-6 lg:px-12">
        {/* ── Cash Payouts ── */}
        <div className="payment-card-skew bg-surface-950 border-l-[8px] border-accent-300 ring-1 ring-accent-300/40 cash-card-glow relative overflow-hidden group">
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-56 bg-black/40 border-l border-accent-300/10 z-0" />
          <div className="payment-card-skew-content min-h-[320px] relative z-10">
            <div className="flex-1 p-8 lg:p-12 lg:pr-64 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-3xl text-accent-300">
                  bolt
                </span>
                <span className="font-body font-bold tracking-[0.3em] text-accent-300 uppercase text-[10px]">
                  Instant Release
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black font-display uppercase mb-4 text-white italic">
                Cash Payouts
              </h2>
              <p className="text-lg font-display mb-6 text-white max-w-md">
                Tier 1 transactions under the threshold of{" "}
                <span className="vibrant-threshold">$1,000.00</span> are
                processed for immediate onsite collection.
              </p>
              <div className="flex">
                <a
                  href="https://maps.google.com/?q=3324+63rd+Ave+E,+Bradenton,+FL+34203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skew-container flex items-center justify-center gap-3 px-7 py-3.5 amber-gradient text-black font-black font-body text-[10px] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,183,77,0.3)]"
                >
                  <span>FIND CASH LOCATION</span>
                  <span className="material-symbols-outlined text-lg font-bold">
                    location_on
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-56 items-center justify-center z-20 pointer-events-none">
            <div className="text-accent-300/[0.18] text-[5rem] font-black font-display rotate-90 select-none tracking-widest whitespace-nowrap">
              CASH
            </div>
          </div>
        </div>

        {/* ── Check Payouts ── */}
        <div
          className="payment-card-skew border-l-[8px] border-surface-400 ring-1 ring-white/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ backgroundColor: "#1a1e24" }}
        >
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-56 bg-black/30 border-l border-white/5 z-0" />
          <div className="payment-card-skew-content min-h-[320px] relative z-10">
            <div className="flex-1 p-8 lg:p-12 lg:pr-64 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-3xl text-surface-400">
                  mail_outline
                </span>
                <span className="font-body font-bold tracking-[0.3em] text-surface-400 uppercase text-[10px]">
                  Registered Mail
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black font-display uppercase mb-4 text-white italic">
                Check Payouts
              </h2>
              <p className="text-lg font-display mb-6 text-surface-300 max-w-md">
                High-value corporate disbursements for transactions totaling{" "}
                <span className="vibrant-threshold">$1,000.00 or more</span>.
              </p>
              <div className="flex">
                <Link
                  to="/contact"
                  className="skew-container flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-black font-black font-body text-[10px] hover:bg-surface-200 transition-colors shadow-lg"
                >
                  <span>VERIFY MAILING ADDRESS</span>
                  <span className="material-symbols-outlined text-lg font-bold">
                    edit_square
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-56 items-center justify-center z-20 pointer-events-none">
            <div className="text-white/[0.16] text-[5rem] font-black font-display rotate-90 select-none tracking-widest whitespace-nowrap uppercase">
              CHECK
            </div>
          </div>
        </div>

        {/* ── Mandatory 3-Day Rule ── */}
        <div className="payment-compliance-card p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-8 relative mt-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] px-4">
            <span className="font-body text-[9px] tracking-[0.5em] text-surface-500">
              MANDATORY COMPLIANCE
            </span>
          </div>
          <div className="skew-container flex-shrink-0 size-16 rounded-none border-2 border-accent-300 flex items-center justify-center text-accent-300">
            <span className="material-symbols-outlined text-3xl">
              schedule
            </span>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl font-black font-display uppercase mb-3 tracking-tight">
              The Mandatory 3-Day Rule
            </h3>
            <p className="text-base text-surface-400 font-display leading-relaxed">
              Pursuant to legal mandate, a strict{" "}
              <span className="vibrant-threshold text-sm italic">
                3-day industrial processing period
              </span>{" "}
              applies to all check disbursements. No exceptions are permitted to
              this security verification window.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              className="group inline-flex items-center gap-2 text-accent-300 font-body text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
              to="/scrap-laws"
            >
              READ REGULATIONS
              <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Legal / Compliance Footer Section */}
      <section className="mt-16 bg-black py-10 px-6 lg:px-20 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[9px] font-black font-body text-surface-600 uppercase tracking-[0.4em] mb-2">
              Legal Compliance Office
            </p>
            <p className="text-sm font-display text-surface-400">
              Regulated Activity Disclosure:{" "}
              <span className="text-white font-bold">
                FLORIDA STATUTE 538.235
              </span>
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <p className="text-xs font-display text-surface-500 italic hidden lg:block">
              Disbursement support available 24/7
            </p>
            <Link to="/contact" className="flex items-center gap-3 px-6 py-3 payment-compliance-card text-accent-300 font-body font-bold text-[10px] tracking-widest hover:bg-accent-300 hover:text-black transition-all">
              <span className="material-symbols-outlined text-lg">headset_mic</span>
              <span>CONTACT SUPPORT</span>
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] font-body tracking-widest text-surface-600 uppercase">
            &copy; {new Date().getFullYear()} RENOVO RESOURCE SOLUTIONS
          </p>
        </div>
      </section>
    </div>
  );
}
