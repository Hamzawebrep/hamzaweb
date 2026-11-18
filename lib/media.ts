// ------------------------------------------------------------------
// Médias & constantes du site
// Les visuels générés servent de placeholders : remplacez-les par
// les photos réelles de vos chantiers (dossier /public).
// ------------------------------------------------------------------

const IMAGE_API = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image';

/** Construit une URL d'image générée (placeholder). */
export const img = (prompt: string, size: string) =>
  `${IMAGE_API}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

export const media = {
  hero: img(
    'luxury minimalist living room interior, seamless warm beige microcement concrete walls and floor, no grout joints, soft natural daylight, high-end architectural editorial photography, travertine tones, subtle shadows, ultra realistic',
    'landscape_16_9'
  ),
  manifesto: img(
    'close-up of artisan hands applying microcement with a stainless steel trowel on a wall, warm mineral tones, textured surface, cinematic side light, editorial craft photography',
    'landscape_4_3'
  ),
  beforeAfter: {
    before: '/avant.webp',
    after: '/apres.webp',
  },
  advantagesImage: img(
    'minimalist luxury boutique hotel lobby interior, warm travertine and terracotta tones, seamless concrete surfaces, ambient lighting, architectural photography, editorial',
    'portrait_4_3'
  ),
  about: img(
    'portrait of a professional craftsman in a minimalist atelier, warm natural light, wearing work clothes, calm confident expression, editorial photography, mineral tones',
    'portrait_4_3'
  ),
} as const;

export type ProjectId = 'riad' | 'anfa' | 'boutique' | 'palmeraie' | 'restaurant' | 'showroom';

export const projectImages: Record<ProjectId, string> = {
  riad: img(
    'luxury spa hammam interior with seamless microcement walls, warm lighting, minimalist wellness design, architectural photography',
    'portrait_4_3'
  ),
  anfa: img(
    'modern kitchen with seamless beige concrete microcement countertops and walls, minimalist, warm tones, architectural photography',
    'portrait_4_3'
  ),
  boutique: img(
    'luxury boutique store interior with polished microcement floor, minimalist retail design, warm ambient lighting, architectural photography',
    'portrait_4_3'
  ),
  palmeraie: img(
    'luxury villa terrace with microcement floor, palm shadows, marrakech architecture, warm sunset light, architectural photography',
    'portrait_4_3'
  ),
  restaurant: img(
    'elegant restaurant interior with microcement walls, warm terracotta tones, moody lighting, architectural photography',
    'portrait_4_3'
  ),
  showroom: img(
    'modern design showroom with polished concrete microcement floor, minimalist industrial chic, bright natural light, architectural photography',
    'portrait_4_3'
  ),
};

export const contacts = {
  phone: '+212 664 19 18 70',
  phoneRaw: '212664191870',
  secondaryPhone: '+212 625 35 29 39',
  whatsapp: 'https://wa.me/212664191870',
  instagram: 'https://www.instagram.com/atelier_microciment',
  facebook: 'https://www.facebook.com/322739018383617?ref=NONE_xav_ig_profile_page_web',
} as const;

/** Message WhatsApp pré-rempli (devis). */
export function whatsappLink(message: string) {
  return `https://wa.me/${contacts.phoneRaw}?text=${encodeURIComponent(message)}`;
}
