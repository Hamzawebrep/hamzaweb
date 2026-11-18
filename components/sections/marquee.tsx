import { getTranslations } from 'next-intl/server';

export async function Marquee() {
  const t = await getTranslations('marquee');
  const items = t.raw('items') as string[];
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-coal py-5">
      <div className="animate-marquee flex w-max items-center gap-12">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="label flex items-center gap-12 whitespace-nowrap text-travertine/65"
          >
            {item}
            <span className="text-terracotta">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
