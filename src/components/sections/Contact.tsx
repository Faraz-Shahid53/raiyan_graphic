"use client";

import { siteConfig } from "@/config/site";
import ContactForm from "../ContactForm";
import MagneticButton from "../MagneticButton";
import { useRevealGroup } from "../Reveal";

/** Contact CTA heading + form + book-a-call / email fallbacks. */
export default function Contact() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section
      ref={ref}
      id="contact"
      className="border-t border-line px-5 py-24 sm:px-8 sm:py-32"
    >
      <div data-reveal className="mb-14 max-w-4xl">
        <span className="mb-4 block font-display text-xs uppercase tracking-[0.3em] text-muted">
          (Contact)
        </span>
        <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-semibold uppercase leading-[1.02]">
          Let’s build
          <br />
          something <span className="text-accent">great.</span>
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Have a brand in mind or just an idea on a napkin? Tell me about it —
          {siteConfig.status.toLowerCase()} for new projects.
        </p>
      </div>

      <div data-reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ContactForm />
        </div>

        <aside className="flex flex-col gap-8 lg:col-span-4">
          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
              Prefer to talk?
            </p>
            <MagneticButton
              href={siteConfig.whatsappUrl}
              className="inline-block rounded-full border border-accent px-6 py-3 text-sm uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent hover:text-bg"
              strength={10}
            >
              Chat on WhatsApp →
            </MagneticButton>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
              Prefer email?
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display text-lg underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
              Portfolio
            </p>
            <a
              href={siteConfig.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-lg underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Behance ↗
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
