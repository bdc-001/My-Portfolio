import { useEffect, useState } from "react";
import { FiCpu, FiEdit3, FiMusic } from "react-icons/fi";
import { NOW } from "../constants";
import GlowCard from "./motion/GlowCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ICONS = {
  Building: { Icon: FiCpu, tint: "text-periwinkle bg-periwinkle/10" },
  Writing: { Icon: FiEdit3, tint: "text-coral bg-coral/10" },
  "Off the clock": { Icon: FiMusic, tint: "text-mint bg-mint/10" },
};

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const BangaloreClock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2" aria-label="Local time in Bangalore">
      <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_rgba(127,224,195,0.8)]" aria-hidden />
      <time className="font-mono text-[12px] tabular-nums text-neutral-300" dateTime={now.toISOString()}>
        {clockFormat.format(now)}
      </time>
      <span className="hidden sm:inline">IST, Bangalore</span>
    </span>
  );
};

const Now = () => (
  <section id="now" className="container-site scroll-mt-24 py-16 md:py-24">
    <SectionHeader
      index="02"
      label="Now"
      meta={<BangaloreClock />}
      title={
        <>
          What I&apos;m up to <span className="text-neutral-500">these days.</span>
        </>
      }
      description="A snapshot of where my time goes right now. Updated whenever it changes."
      className="mb-10"
    />

    <div className="grid gap-3 md:grid-cols-3">
      {NOW.map((item, i) => {
        const { Icon, tint } = ICONS[item.label] ?? ICONS.Building;
        return (
          <Reveal key={item.label} delay={0.08 * i}>
            <GlowCard className="flex h-full flex-col gap-10 p-6 md:p-7">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tint}`}>
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <div>
                <p className="label">{item.label}</p>
                <p className="mt-2.5 text-pretty text-lg leading-snug text-neutral-100">{item.text}</p>
              </div>
            </GlowCard>
          </Reveal>
        );
      })}
    </div>
  </section>
);

export default Now;
