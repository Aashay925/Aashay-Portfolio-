import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { PROFILE, PROJECT_SCOPES } from "../data/content";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [scopes, setScopes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleScope = (s) =>
    setScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("access_key", "b32f5bda-a0a7-4d19-8f3d-061529f7ea94");
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("message", message.trim());
      formData.append("project_scope", scopes.join(", ") || "General Inquiry");
      formData.append("subject", `New Inquiry from ${name.trim()} · Portfolio`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Message sent successfully! I'll get back to you shortly.");
        setName("");
        setEmail("");
        setMessage("");
        setScopes([]);
      } else {
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try reaching me directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#F2F5EE]" data-testid="contact-section">
      {/* Numeral watermark */}
      <div className="spec-numeral absolute -top-16 -left-6 z-0">06</div>

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono2 text-[10px] font-semibold tracking-widest text-[#1F4D40] uppercase">06 / CONTACT</span>
          <div className="h-px flex-1 bg-[#C8D1C3]" />
          <span className="font-mono2 text-[9px] text-[#52635B] uppercase hidden sm:block">COMMUNICATION UPLINK</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <Reveal>
                <p className="font-mono2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#FF5A2B] mb-4" data-testid="contact-eyebrow">
                  06 — Contact
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14261F] leading-[1.08]">
                  Have a system worth building?
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex items-center gap-3 mt-4" data-testid="availability-status">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#1F4D40]" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1F4D40]" />
                  </span>
                  <p className="font-mono2 text-[10px] tracking-wider uppercase text-[#14261F] font-semibold">{PROFILE.availability}</p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-5 text-base text-[#424845] leading-relaxed">
                  Whether you need autonomous workflow agents, high-accuracy RAG architectures, or deep Zoho ecosystem automation, I am currently accepting selected contract engagements.
                </p>
              </Reveal>
            </div>

            {/* Project scopes */}
            <Reveal delay={0.22}>
              <div className="pt-2">
                <p className="font-mono2 text-[9px] tracking-[0.3em] uppercase text-[#52635B] mb-3">project scope · select any</p>
                <div className="flex flex-wrap gap-2" data-testid="scope-selector">
                  {PROJECT_SCOPES.map((s) => (
                    <button
                      key={s}
                      data-testid={`scope-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      onClick={() => toggleScope(s)}
                      aria-pressed={scopes.includes(s)}
                      className={`rounded-[4px] px-3.5 py-2 text-[10px] font-mono2 font-medium transition-colors ${
                        scopes.includes(s)
                          ? "bg-[#FF5A2B] text-white"
                          : "border border-[#C8D1C3] bg-[#FFFFFF] text-[#424845] hover:border-[#FF5A2B]/50 hover:text-[#14261F]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Form */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="rounded-[6px] border border-[#C8D1C3] bg-[#FFFFFF] p-6 sm:p-9 space-y-5 shadow-sm"
              data-testid="contact-form"
            >
              <div className="border-b border-[#C8D1C3] pb-4 flex items-center justify-between">
                <span className="font-mono2 text-[10px] font-semibold text-[#14261F] uppercase tracking-widest">INITIATE UPLINK MESSAGE</span>
                <span className="font-mono2 text-[9px] text-[#52635B]">ENC: 256-BIT DISPATCH</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-mono2 text-[9px] tracking-[0.25em] uppercase text-[#52635B] mb-2">Operator Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    data-testid="contact-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Alan Turing"
                    required
                    className="w-full rounded-[4px] border border-[#C8D1C3] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#14261F] placeholder:text-[#C8D1C3] outline-none focus:border-[#FF5A2B] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono2 text-[9px] tracking-[0.25em] uppercase text-[#52635B] mb-2">Communication Endpoint</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    data-testid="contact-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@enterprise.com"
                    required
                    className="w-full rounded-[4px] border border-[#C8D1C3] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#14261F] placeholder:text-[#C8D1C3] outline-none focus:border-[#FF5A2B] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-mono2 text-[9px] tracking-[0.25em] uppercase text-[#52635B] mb-2">What are we building?</label>
                <textarea
                  id="contact-message"
                  name="message"
                  data-testid="contact-message-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Detail the business context, pipeline requirements, and performance objectives..."
                  required
                  className="w-full rounded-[4px] border border-[#C8D1C3] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#14261F] placeholder:text-[#C8D1C3] outline-none focus:border-[#FF5A2B] transition-colors resize-none"
                />
              </div>
              <div className="pt-1 flex items-center justify-between">
                <span className="font-mono2 text-[9px] text-[#52635B]">LATENCY ESTIMATE: &lt; 24H</span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="contact-submit-btn"
                  className="group inline-flex items-center gap-2 rounded-[4px] bg-[#FF5A2B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e0481b] active:bg-[#c4380f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={13} className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isSubmitting ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
