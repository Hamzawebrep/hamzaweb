export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — AM Atelier</title>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          background: '#0c0b0a',
          color: '#f7f3ec',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(5rem, 22vw, 12rem)',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.08)',
          }}
        >
          404
        </span>
        <h1
          style={{
            margin: '-1.5rem 0 0',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 300,
            fontSize: '1.9rem',
          }}
        >
          Page introuvable · Page not found
        </h1>
        <p style={{ maxWidth: 420, color: 'rgba(204,190,171,0.7)', fontSize: 14 }}>
          Cette page n&apos;existe pas ou a été déplacée.
          <br />
          This page does not exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <a
            href="/fr"
            style={{
              background: '#c05f3a',
              color: '#fff',
              padding: '0.85rem 1.6rem',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Accueil
          </a>
          <a
            href="/en"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#f7f3ec',
              padding: '0.85rem 1.6rem',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Home
          </a>
        </div>
      </body>
    </html>
  );
}
