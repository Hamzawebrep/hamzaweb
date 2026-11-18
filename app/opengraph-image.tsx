import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt =
  'AM Atelier — Finitions haut de gamme pour villas & espaces d’exception';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 76,
          padding: '74px',
          background:
            'linear-gradient(120deg, #141311 0%, #211e19 60%, #30271f 100%)',
          color: '#f7f3ec',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            width: 390,
            height: 450,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 28,
            background: '#f7f3ec',
          }}
        >
          <img
            src={logoSrc}
            width="330"
            height="330"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <div
            style={{
              color: '#d99a5b',
              fontSize: 19,
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            Microciment &amp; Béton Ciré
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: 'Georgia, serif',
              fontSize: 68,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            AM Atelier
          </div>
          <div
            style={{
              width: 78,
              height: 3,
              marginTop: 28,
              background: '#c05f3a',
            }}
          />
          <div
            style={{
              marginTop: 24,
              maxWidth: 560,
              color: '#e2d8c8',
              fontFamily: 'Georgia, serif',
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Finitions haut de gamme pour villas &amp; espaces d’exception
          </div>
          <div
            style={{
              marginTop: 28,
              color: '#ccbeab',
              fontSize: 18,
              letterSpacing: 1,
            }}
          >
            Sols · Murs · Salles de bain · Cuisines
          </div>
          <div
            style={{
              marginTop: 34,
              color: '#a99c88',
              fontSize: 18,
            }}
          >
            hamzaweb-nine.vercel.app
          </div>
        </div>
      </div>
    ),
    size,
  );
}
