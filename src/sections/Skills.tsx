import { SectionHeader } from '../components';
import { SKILLS } from '../data';
import type { Tweaks } from '../types';

// --- Skills (compact) ---------------------------------------------
export function Skills({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  return (
    <section id="skills" data-screen-label="05 Stack" style={{padding:'100px 6vw'}}>
      <SectionHeader num="05" title="Stack" subtitle={L?"Tools I reach for":"普段触っているもの"}/>
      <div style={{maxWidth:1280, margin:'40px auto 0', display:'flex', flexWrap:'wrap', gap:10}}>
        {SKILLS.flatMap(g => g.items).map(it => (
          <span key={it} style={{
            padding:'8px 14px', fontSize:13,
            fontFamily:'"JetBrains Mono", monospace',
            border:'1px solid rgba(255,255,255,0.12)',
            background:'rgba(255,255,255,0.03)',
            transition:'all 0.2s', cursor:'default',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.color=''; }}>
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}
