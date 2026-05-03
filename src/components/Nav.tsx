export function Nav() {
  const items = [
    { id: 'links', label: 'Links' },
    { id: 'about', label: 'About' },
    { id: 'works', label: 'Works' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 6vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(10,11,15,0.9), rgba(10,11,15,0))',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>
        <span style={{ color: 'var(--accent)' }}>{'</>'}</span>
        <span>kokoa0429</span>
      </div>
      <div style={{ display: 'flex', gap: 28, fontSize: 13, fontFamily: '"JetBrains Mono", monospace' }}>
        {items.map((it) => (
          <a
            key={it.id}
            href={'#' + it.id}
            style={{ textDecoration: 'none', color: 'rgba(238,240,242,0.7)', letterSpacing: '0.05em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(238,240,242,0.7)'; }}
          >
            {it.label}
          </a>
        ))}
      </div>
      <a
        href="https://github.com/kokoa0429"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 12,
          fontFamily: '"JetBrains Mono", monospace',
          padding: '8px 14px',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}
      >
        GitHub &#8599;
      </a>
    </nav>
  );
}
