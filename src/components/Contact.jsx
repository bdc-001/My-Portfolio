import { useRef, useState } from "react";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiArrowUp, FiArrowUpRight, FiCheck, FiCopy, FiDownload } from "react-icons/fi";
import { CONTACT, PROFILE } from "../constants";
import { MOTION_OK, gsap, scrollToTarget, useGSAP } from "../lib/motion";
import GlowCard from "./motion/GlowCard";
import Magnetic from "./motion/Magnetic";
import SplitReveal from "./motion/SplitReveal";

const SOCIALS = [
  { href: CONTACT.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: CONTACT.youtube, label: "YouTube", Icon: FaYoutube },
  { href: CONTACT.github, label: "GitHub", Icon: FaGithub },
];

const Contact = () => {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-footer-inner]",
          { yPercent: -12 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } }
        );
        gsap.fromTo(
          "[data-wordmark]",
          { yPercent: 70, opacity: 0.2 },
          { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: "[data-wordmark]", start: "top bottom", end: "bottom bottom", scrub: true } }
        );
      });
    },
    { scope: root }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  return (
    <footer id="contact" ref={root} className="relative overflow-hidden">
      <div data-footer-inner className="will-change-transform">
        <div className="container-site pt-28 md:pt-44">
          <GlowCard className="overflow-hidden !rounded-[28px] px-6 py-14 sm:px-12 md:px-16 md:py-20">
            <div
              className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.22),transparent)]"
              aria-hidden
            />

            <div className="relative">
              <SplitReveal className="display max-w-[11em] text-[clamp(2.75rem,7.5vw,6.25rem)] leading-[0.98]">
                Let&apos;s build <span className="text-neutral-500">something bold.</span>
              </SplitReveal>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-neutral-400">
                Product problems, hiring conversations, or a good ghazal recommendation. My inbox is open.
              </p>

              <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.2}>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="group inline-flex items-center gap-3 rounded-full bg-bone px-5 py-3.5 text-[15px] font-medium tracking-normal text-ink transition-colors hover:bg-white sm:pl-6 sm:pr-3.5 sm:text-lg"
                    >
                      <span className="break-all">{CONTACT.email}</span>
                      <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-500 ease-expo group-hover:rotate-45 sm:flex">
                        <FiArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-white/40 hover:text-bone"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                  >
                    {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                  </button>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {SOCIALS.map(({ href, label, Icon }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                        <Icon className="h-4 w-4" aria-hidden />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlowCard>
        </div>

        <div className="container-site mt-14 overflow-hidden pb-3 [container-type:inline-size] md:mt-20 md:pb-5">
          <p
            data-wordmark
            className="select-none whitespace-nowrap bg-gradient-to-b from-white/[0.16] to-white/[0.02] bg-clip-text text-center font-display text-[length:11.6cqw] font-light leading-[1.05] tracking-[-0.05em] text-transparent"
            aria-hidden
          >
            {PROFILE.name}
          </p>
        </div>

        <div className="border-t border-white/[0.07]">
          <div className="container-site flex flex-col gap-4 py-7 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Keep Hustling · {PROFILE.name} · {CONTACT.address}
            </p>
            <a
              href={CONTACT.resume}
              download="Arsalaan_Mohammed_Resume.pdf"
              className="inline-flex items-center gap-2 transition-colors hover:text-bone"
            >
              <FiDownload className="h-3.5 w-3.5" aria-hidden />
              For the HODs &amp; hiring managers
            </a>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="inline-flex items-center gap-2 transition-colors hover:text-bone"
            >
              Back to top <FiArrowUp className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
