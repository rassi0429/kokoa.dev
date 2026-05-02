import { useEffect, useState } from 'react';
import { About, Hero } from './sections-1';
import { Footer, Gallery, Links, Orgs, Skills, Works } from './sections-2';
import { TweaksPanel } from './tweaks';
import type { MouseState, Tweaks } from './types';

const TWEAK_DEFAULTS: Tweaks = {
  accent: 'cyan',
  bg: 'grid',
  lang: 'jp',
  density: 'compact',
  filter: 'all',
  cursor: 'on',
};

export function App() {
  const [tweaks, setTweaks] = useState<Tweaks>(TWEAK_DEFAULTS);
  const [mouse, setMouse] = useState<MouseState>({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMouse({ x, y, rawX: e.clientX, rawY: e.clientY });
    };
    const onScroll = () => {
      const h = document.documentElement;
      const maxScroll = h.scrollHeight - h.clientHeight;
      setScrollPct(maxScroll > 0 ? h.scrollTop / maxScroll : 0);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.accent = tweaks.accent;
  }, [tweaks.accent]);

  return (
    <div>
      <Cursor mouse={mouse} enabled={tweaks.cursor === 'on'} />
      <ProgressBar pct={scrollPct} />
      <Nav />
      <Hero tweaks={tweaks} mouse={mouse} />
      <Links tweaks={tweaks} />
      <About tweaks={tweaks} />
      <Works tweaks={tweaks} />
      <Skills tweaks={tweaks} />
      <Gallery tweaks={tweaks} />
      <Orgs tweaks={tweaks} />
      <Footer />
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

function Cursor({ mouse, enabled }: { mouse: MouseState; enabled: boolean }) {
  if (!enabled) return null;
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: mouse.rawX,
          top: mouse.rawY,
          width: 8,
          height: 8,
          borderRadius: 4,
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%,-50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: mouse.rawX,
          top: mouse.rawY,
          width: 40,
          height: 40,
          borderRadius: 20,
          border: '1px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: 0.5,
        }}
      />
    </>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9998,
        background: 'rgba(255,255,255,0.04)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: String(pct * 100) + '%',
          background: 'var(--accent)',
          transition: 'width 0.1s',
        }}
      />
    </div>
  );
}

function Nav() {
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
