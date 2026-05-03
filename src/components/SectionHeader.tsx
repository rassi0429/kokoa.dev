export function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return <div style={{maxWidth:1280, margin:'0 auto', display:'flex', alignItems:'baseline', gap:20}}>
    <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:13, color:'var(--accent)'}}>{num}</span>
    <h2 style={{
      fontSize:'clamp(32px, 5vw, 56px)', fontWeight:700, margin:0,
      letterSpacing:'-0.02em', fontFamily:'Manrope, "Zen Kaku Gothic New", sans-serif',
    }}>{title}</h2>
    <span style={{fontSize:14, color:'rgba(238,240,242,0.4)', marginLeft:8}}>— {subtitle}</span>
    <span style={{flex:1, height:1, background:'rgba(255,255,255,0.08)', marginLeft:8}}/>
  </div>;
}
