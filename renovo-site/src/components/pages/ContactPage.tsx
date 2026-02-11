import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Ferrous Metals",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill out all required fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setFormData({ name: "", email: "", category: "Ferrous Metals", message: "" });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("3324 63rd Ave E, Bradenton, FL 34203");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="payment-page-bg text-white min-h-screen">
      {/* ── Page Title ── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-28 lg:pt-32 pb-10 lg:pb-14 text-center">
        <div className="inline-block border-y border-accent-300/30 py-1.5 mb-4">
          <p className="text-accent-400 font-bold font-body tracking-[0.4em] text-[10px] uppercase">
            Renovo Resource Solutions
          </p>
        </div>
        <h1 className="text-white uppercase text-4xl lg:text-7xl mb-5 leading-[0.9] font-display">
          Contact <br />
          <span className="text-accent-400">Center</span>
        </h1>
        <p className="text-base text-surface-400 max-w-lg mx-auto font-body">
          Submit your inquiry regarding scrap metal types, industrial pickups,
          or partnership opportunities.
        </p>
      </div>

      {/* ── Form + Map ── */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row ring-1 ring-surface-600 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Form Side */}
          <div className="w-full lg:w-[42%] bg-surface-900 industrial-texture p-8 lg:p-10 flex flex-col border-b lg:border-b-0 lg:border-r border-surface-600">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-2xl text-accent-400">mail</span>
              <span className="font-body font-bold tracking-[0.3em] text-accent-300 uppercase text-[10px]">
                Send a Message
              </span>
            </div>

            <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="label">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="label">Business Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="input"
                  placeholder="john@industrial-supply.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contact-category" className="label">Scrap Category</label>
                <select
                  id="contact-category"
                  className="input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Ferrous Metals</option>
                  <option>Non-Ferrous Metals</option>
                  <option>Industrial Equipment</option>
                  <option>Other / Multiple</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="contact-message" className="label">Message</label>
                <textarea
                  id="contact-message"
                  className="textarea flex-1"
                  placeholder="Describe your materials or request..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                <span>SEND MESSAGE</span>
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </div>

          {/* Map Side — Real Google Maps */}
          <div className="w-full lg:w-[58%] relative min-h-[350px] lg:min-h-0 bg-surface-800">
            <iframe
              src="https://maps.google.com/maps?q=3324+63rd+Ave+E,+Bradenton,+FL+34203&z=15&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: "brightness(0.85) contrast(1.05) saturate(0.7)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Renovo Resource Solutions Location"
              allowFullScreen
            />

            {/* Floating address badge */}
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto z-10">
              <div className="bg-surface-950/90 backdrop-blur-sm border border-surface-600 px-5 py-3 flex items-center gap-3 shadow-xl">
                <span className="material-symbols-outlined text-accent-500 text-xl">location_on</span>
                <div>
                  <p className="text-white text-sm font-bold">3324 63rd Ave E</p>
                  <p className="text-surface-400 text-xs">Bradenton, FL 34203</p>
                </div>
                <div className="flex items-center gap-2 ml-3 border-l border-surface-600 pl-3">
                  <button
                    onClick={handleCopyAddress}
                    className="text-surface-400 hover:text-white transition-colors"
                    title="Copy address"
                  >
                    <span className="material-symbols-outlined text-base">
                      {copied ? "check" : "content_copy"}
                    </span>
                  </button>
                  <a
                    href="https://maps.google.com/?q=3324+63rd+Ave+E,+Bradenton,+FL+34203"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-surface-400 hover:text-accent-500 transition-colors"
                    title="Open in Google Maps"
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info Strip ── */}
      <section className="py-14 px-6 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Address */}
          <div className="payment-compliance-card p-6 lg:p-8 flex items-start gap-4">
            <div className="skew-container flex-shrink-0 size-12 border-2 border-accent-300 flex items-center justify-center text-accent-300">
              <span className="material-symbols-outlined text-xl">home_work</span>
            </div>
            <div>
              <p className="font-body font-bold tracking-[0.3em] text-accent-300 uppercase text-[9px] mb-2">
                Main Facility
              </p>
              <p className="text-white font-bold">3324 63rd Ave E</p>
              <p className="text-surface-400 text-sm">Bradenton, FL 34203</p>
            </div>
          </div>

          {/* Phone */}
          <div className="payment-compliance-card p-6 lg:p-8 flex items-start gap-4">
            <div className="skew-container flex-shrink-0 size-12 border-2 border-accent-300 flex items-center justify-center text-accent-300">
              <span className="material-symbols-outlined text-xl">phone_in_talk</span>
            </div>
            <div>
              <p className="font-body font-bold tracking-[0.3em] text-accent-300 uppercase text-[9px] mb-2">
                Dispatch Line
              </p>
              <p className="text-white font-bold">(941) 727-0177</p>
              <p className="text-surface-400 text-sm">Mon–Fri 8am–5pm · Sat 8am–2pm</p>
              <a
                href="tel:9417270177"
                className="group mt-2 inline-flex items-center gap-1.5 text-accent-300 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
              >
                Call Now
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="payment-compliance-card p-6 lg:p-8 flex items-start gap-4">
            <div className="skew-container flex-shrink-0 size-12 border-2 border-accent-300 flex items-center justify-center text-accent-300">
              <span className="material-symbols-outlined text-xl">schedule</span>
            </div>
            <div>
              <p className="font-body font-bold tracking-[0.3em] text-accent-300 uppercase text-[9px] mb-2">
                Walk-In Hours
              </p>
              <p className="text-white font-bold">Mon–Fri 8am–5pm</p>
              <p className="text-surface-400 text-sm">Sat 8am–2pm (last load 1:50pm)</p>
              <div className="mt-2 flex items-center gap-1.5 text-accent-300 text-[10px] font-bold tracking-widest uppercase">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                No appointment needed
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
