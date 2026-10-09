import { useState } from "react";
import { Copy, Check, Send, Phone, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "./Reveal";
import { PROFILE, PROJECT_SCOPES } from "../data/content";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [scopes, setScopes] = useState([]);
  const [copied, setCopied] = useState(false);

  const toggleScope = (s) =>
    setScopes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed, please select email manually");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry${scopes.length ? ` · ${scopes.join(", ")}` : ""} · ${name || "New contact"}`
    );
    const body = encodeURIComponent(
      `Hi Aashay,\n\n${message}\n\nScopes: ${scopes.join(", ") || "General Inquiry"}\n\nFrom: ${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#0D0F12]" data-testid="contact-section">
      <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full bg-[#7C8CFF]/[0.05] blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact"
            eyebrow="06 — Contact"
            title="Have a system worth building?"
          />
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3 mb-8" data-testid="availability-status">
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#65C18C]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#65C18C]" />
              </span>
              <p className="font-mono2 text-xs tracking-wider uppercase text-[#A1A7B3]">{PROFILE.availability}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3">
              <button
                data-testid="copy-email-btn"
                onClick={copyEmail}
                className="group inline-flex items-center justify-between rounded-xl border border-[#262B33] bg-[#14171C] px-5 py-3.5 font-mono2 text-sm text-[#F2F4F7] hover:border-[#7C8CFF]/50 transition-colors w-full"
              >
                <span className="flex items-center gap-3">
                  <Mail size={16} className="text-[#7C8CFF]" />
                  <span>{PROFILE.email}</span>
                </span>
                {copied ? <Check size={16} className="text-[#65C18C]" /> : <Copy size={16} className="text-[#6B7280] group-hover:text-[#7C8CFF] transition-colors" />}
              </button>

              <a
                href={`tel:${PROFILE.phone}`}
                className="group inline-flex items-center justify-between rounded-xl border border-[#262B33] bg-[#14171C] px-5 py-3.5 font-mono2 text-sm text-[#F2F4F7] hover:border-[#7C8CFF]/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Phone size={16} className="text-[#7C8CFF]" />
                  <span>{PROFILE.phone}</span>
                </span>
                <span className="text-xs text-[#6B7280] uppercase tracking-wider font-mono2">Call</span>
              </a>

              <div className="inline-flex items-center gap-3 px-5 py-2 font-mono2 text-xs text-[#A1A7B3]">
                <MapPin size={15} className="text-[#7C8CFF] shrink-0" />
                <span>{PROFILE.location}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8">
              <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#6B7280] mb-4">project scope · select any</p>
              <div className="flex flex-wrap gap-2" data-testid="scope-selector">
                {PROJECT_SCOPES.map((s) => (
                  <button
                    key={s}
                    data-testid={`scope-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => toggleScope(s)}
                    aria-pressed={scopes.includes(s)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      scopes.includes(s)
                        ? "bg-[#7C8CFF] text-[#0D0F12]"
                        : "border border-[#262B33] text-[#A1A7B3] hover:border-[#7C8CFF]/60 hover:text-[#F2F4F7]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-[#262B33] bg-[#14171C]/90 p-7 sm:p-10 space-y-6"
            data-testid="contact-form"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#6B7280] mb-2">Name</label>
                <input
                  id="contact-name"
                  data-testid="contact-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full rounded-lg border border-[#262B33] bg-[#0D0F12] px-4 py-3 text-sm text-[#F2F4F7] placeholder:text-[#6B7280] outline-none focus:border-[#7C8CFF]/60 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#6B7280] mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  data-testid="contact-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@analytical.engine"
                  className="w-full rounded-lg border border-[#262B33] bg-[#0D0F12] px-4 py-3 text-sm text-[#F2F4F7] placeholder:text-[#6B7280] outline-none focus:border-[#7C8CFF]/60 transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#6B7280] mb-2">What are we building?</label>
              <textarea
                id="contact-message"
                data-testid="contact-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Tell me about the workflow you want to make autonomous…"
                className="w-full rounded-lg border border-[#262B33] bg-[#0D0F12] px-4 py-3 text-sm text-[#F2F4F7] placeholder:text-[#6B7280] outline-none focus:border-[#7C8CFF]/60 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              data-testid="contact-submit-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-[#7C8CFF] px-8 py-3.5 text-sm font-semibold text-[#0D0F12] hover:bg-[#A5AEFF] hover:text-[#0D0F12] transition-colors"
            >
              Send via Email
              <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
