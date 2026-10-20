import { HERO } from "@/lib/content";

export default function Hero() {
  return (
    <header id="top" className="flex min-h-[88vh] items-center pb-16 pt-28 sm:pt-32">
      <div className="wrap">
        <div className="panel max-w-[640px]">
          <h1 className="font-display text-[clamp(2.3rem,5.4vw,3.8rem)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
            {HERO.headline}
          </h1>
          <p className="mt-6 max-w-[48ch] text-[1.08rem] leading-relaxed text-ink-soft">
            {HERO.lede}
          </p>
          <p className="mt-5 text-[0.98rem] text-ink-soft">{HERO.line}</p>
        </div>
      </div>
    </header>
  );
}
