import { useEffect, useState } from 'react';
import { Cursor, Nav, ProgressBar, TweaksPanel } from './components';
import { About, Footer, Gallery, Hero, Links, Orgs, Skills, Works } from './sections';
import type { MouseState, PersonaMode, Tweaks } from './types';

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
  const [persona, setPersona] = useState<PersonaMode>('hobby');
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

  useEffect(() => {
    document.documentElement.dataset.persona = persona;
  }, [persona]);

  return (
    <div>
      <Cursor mouse={mouse} enabled={tweaks.cursor === 'on'} />
      <ProgressBar pct={scrollPct} />
      <Nav persona={persona} onPersonaChange={setPersona} />
      <Hero tweaks={tweaks} mouse={mouse} persona={persona} />
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
