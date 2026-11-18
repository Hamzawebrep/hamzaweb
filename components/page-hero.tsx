import { Reveal } from '@/components/motion/reveal';

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-40 pb-20 text-bone sm:pt-48 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-terracotta/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="label text-terracotta">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tight">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-travertine/70">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
