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
  beforeAfter: {
    before: '/avant.webp',
    after: '/apres.webp',
  },
  advantagesImage: img(
    'minimalist luxury boutique hotel lobby interior, warm travertine and terracotta tones, seamless concrete surfaces, ambient lighting, architectural photography, editorial',
    'portrait_4_3'
  ),
  /** Portrait réel du fondateur (CEO) — photo fournie par l'atelier. */
  ceo: '/hamza-tagdalt.png',
} as const;

// ------------------------------------------------------------------
// Photos réelles de chantiers (dossier /public) — fournies par l'atelier
// ------------------------------------------------------------------
export const realImages = {
  // Effet béton
  salon: '/effet-beton/salon-microcemento-table-bois.jpeg',
  textureClaire: '/effet-beton/texture-claire-marques.jpeg',
  escalier: '/effet-beton/escalier-bois-mur-beton.jpeg',
  angle: '/effet-beton/angle-mur-microcemento.jpeg',
  facade: '/effet-beton/facade-panneaux-beton.jpeg',
  suspensions: '/effet-beton/suspensions-verre-mur-microcemento.jpeg',
  panneauxJoints: '/effet-beton/panneaux-joints-brique.jpeg',
  panneauxSombre: '/effet-beton/panneaux-mur-plafond-sombre.jpeg',
  murPortant: '/effet-beton/mur-panneaux-portant-textiles.jpeg',
  textureGris: '/effet-beton/texture-microcemento-gris.jpeg',
  plafondHaut: '/effet-beton/plafond-haut-lamparas.jpeg',
  plafondPanneaux: '/effet-beton/plafond-panneaux-beton-ladrillo.jpeg',
  // Enduit à la chaux (Laime wach)
  applicateur: '/enduit-chaux/applicateur-escalier-mur-gris.jpeg',
  applicationTruelle: '/enduit-chaux/application-truelle-escalier.jpeg',
  murGrisBaie: '/enduit-chaux/mur-gris-baie-vitree.jpeg',
  salleBainBeige: '/enduit-chaux/salle-bain-beige-lavabo.jpeg',
  salleBainNoir: '/enduit-chaux/salle-bain-vasque-miroir-noir.jpeg',
  laimeWach: '/laime-wach.jpeg',
} as const;

/** Image associée à chaque prestation (page Services). */
export type ServiceId = 'floors' | 'walls' | 'wet' | 'furniture' | 'lime';

export const serviceImages: Record<ServiceId, string> = {
  floors: realImages.textureGris,
  walls: realImages.facade,
  wet: realImages.salleBainNoir,
  furniture: realImages.salon,
  lime: realImages.laimeWach,
};

export type ProjectId = 'riad' | 'anfa' | 'boutique' | 'palmeraie' | 'restaurant' | 'showroom';

export const projectImages: Record<ProjectId, string> = {
  riad: realImages.angle,
  anfa: realImages.salon,
  boutique: realImages.suspensions,
  palmeraie: realImages.facade,
  restaurant: realImages.plafondHaut,
  showroom: realImages.panneauxSombre,
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
