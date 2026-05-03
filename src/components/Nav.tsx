import type { PersonaMode } from '../types';

type NavProps = {
  persona: PersonaMode;
  onPersonaChange: (persona: PersonaMode) => void;
};

const PERSONA_OPTIONS: Array<{ id: PersonaMode; label: string; short: string }> = [
  { id: 'hobby', label: '趣味', short: 'Hobby' },
  { id: 'work', label: '仕事', short: 'Work' },
];

export function Nav({ persona, onPersonaChange }: NavProps) {
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
        }}
      >
        <span style={{ color: 'var(--accent)' }}>{'</>'}</span>
        <span>kokoa0429</span>
      </div>
      <div style={{ display: 'flex', gap: 28, fontSize: 13, fontFamily: '"JetBrains Mono", monospace' }}>
        {items.map(it => (
          <a
            key={it.id}
            href={'#' + it.id}
            style={{
              textDecoration: 'none',
              color: 'rgba(238,240,242,0.7)',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(238,240,242,0.7)';
            }}
          >
            {it.label}
          </a>
        ))}
      </div>
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          className="persona-switch"
          role="group"
          aria-label="表示モード"
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(8,9,13,0.62)',
            padding: 3,
            gap: 3,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.04em',
          }}
        >
          {PERSONA_OPTIONS.map(mode => {
            const active = persona === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={active}
                title={mode.short}
                onClick={() => onPersonaChange(mode.id)}
                style={{
                  border: 'none',
                  background: active ? 'var(--accent)' : 'transparent',
                  color: active ? '#0a0b0f' : 'rgba(238,240,242,0.66)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  transition: 'background 0.25s, color 0.25s, transform 0.25s',
                  transform: active ? 'translateY(-1px)' : 'translateY(0)',
                }}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
