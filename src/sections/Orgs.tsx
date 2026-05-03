import { ORGS } from '../data';
import type { Tweaks } from '../types';

// --- Orgs (inline strip) ------------------------------------------
export function Orgs({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  const subset = ORGS.slice(0, 5); // just a few
  return (
    <section id="orgs" data-screen-label="07 Orgs" style={{padding:'70px 6vw'}}>
      <div style={{maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', gap:'14px 28px', fontSize:13, fontFamily:'"JetBrains Mono", monospace'}}>
        <span style={{color:'var(--accent)', letterSpacing:'0.15em'}}>// {L?"ALSO HANGING OUT AT":"出没してるところ"}</span>
        {subset.map(o => (
          <span key={o.name} style={{color:'rgba(238,240,242,0.7)'}}>
            @{o.name}
            <span style={{color:'rgba(238,240,242,0.35)', marginLeft:6}}>· {o.note}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
