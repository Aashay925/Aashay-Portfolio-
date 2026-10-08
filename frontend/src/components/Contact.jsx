import { useState } from "react";
import { Copy, Check, Send } from "lucide-react";
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
      toast.error("Copy failed — select the email manually");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry${scopes.length ? ` — ${scopes.join(", ")}` : ""} · ${name || "New contact"}`
    );
    const body = encodeURIComponent(
      `Hi Aashay,\n\n${message}\n\nScopes: ${scopes.join(", ") || "—"}\n\n— ${name}\n${email}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#0D0F16]" data-testid="contact-section">
      <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] rounded-full bg-[#E06D3B]/[0.06] blur-[140px] pointer-events-none" />

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
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="font-mono2 text-xs tracking-wider uppercase text-[#94A3B8]">{PROFILE.availability}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              data-testid="copy-email-btn"
              onClick={copyEmail}
              className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#12141D] px-5 py-4 font-mono2 text-sm text-[#F4F5F8] hover:border-[#E06D3B]/50 transition-colors"
            >
              {PROFILE.email}
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-[#64748B] group-hover:text-[#E06D3B] transition-colors" />}
            </button>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#64748B] mb-4">project scope — select any</p>
              <div className="flex flex-wrap gap-2" data-testid="scope-selector">
                {PROJECT_SCOPES.map((s) => (
                  <button
                    key={s}
                    data-testid={`scope-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => toggleScope(s)}
                    aria-pressed={scopes.includes(s)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      scopes.includes(s)
                        ? "bg-[#38BDF8] text-[#0A0B10]"
                        : "border border-white/10 text-[#94A3B8] hover:border-[#38BDF8]/60 hover:text-[#F4F5F8]"
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
            className="rounded-2xl border border-white/10 bg-[#181B26]/80 p-7 sm:p-10 space-y-6"
            data-testid="contact-form"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#64748B] mb-2">Name</label>
                <input
                  id="contact-name"
                  data-testid="contact-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full rounded-lg border border-white/10 bg-[#0A0B10] px-4 py-3 text-sm text-[#F4F5F8] placeholder:text-[#3d4658] outline-none focus:border-[#E06D3B]/60 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#64748B] mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  data-testid="contact-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@analytical.engine"
                  className="w-full rounded-lg border border-white/10 bg-[#0A0B10] px-4 py-3 text-sm text-[#F4F5F8] placeholder:text-[#3d4658] outline-none focus:border-[#E06D3B]/60 transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#64748B] mb-2">What are we building?</label>
              <textarea
                id="contact-message"
                data-testid="contact-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Tell me about the workflow you want to make autonomous…"
                className="w-full rounded-lg border border-white/10 bg-[#0A0B10] px-4 py-3 text-sm text-[#F4F5F8] placeholder:text-[#3d4658] outline-none focus:border-[#E06D3B]/60 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              data-testid="contact-submit-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-[#E06D3B] px-8 py-3.5 text-sm font-semibold text-[#0A0B10] hover:bg-[#F4F5F8] hover:text-[#0A0B10] transition-colors"
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
