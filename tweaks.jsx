// Tweaks panel
const { useState: useStateTw, useEffect: useEffectTw } = React;

function TweaksPanel({ tweaks, setTweaks }) {
  const [open, setOpen] = useStateTw(false);
  const [active, setActive] = useStateTw(false);

  useEffectTw(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') { setActive(true); setOpen(true); }
      if (e.data.type === '__deactivate_edit_mode') { setActive(false); setOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[k]:v}}, '*');
  };

  if (!active) return null;

  const accentOptions = [
    { id: 'lime',   label: 'Lime',   val: 'oklch(0.87 0.19 112)' },
    { id: 'cyan',   label: 'Cyan',   val: 'oklch(0.78 0.14 210)' },
    { id: 'violet', label: 'Violet', val: 'oklch(0.72 0.18 300)' },
    { id: 'amber',  label: 'Amber',  val: 'oklch(0.82 0.17 75)' },
  ];
  const bgOptions = [
    { id: 'grid',    label: 'Grid' },
    { id: 'dots',    label: 'Dots' },
    { id: 'noise',   label: 'Noise' },
    { id: 'plain',   label: 'Plain' },
  ];
  const langOptions = [{id:'jp',label:'JP'},{id:'en',label:'EN'}];

  return (
    <div style={{
      position:'fixed', right:16, bottom:16, zIndex:9999,
      width: open ? 300 : 'auto',
      background:'rgba(12,14,20,0.92)',
      border:'1px solid rgba(255,255,255,0.1)',
      borderRadius:12, color:'#eef0f2',
      fontFamily:'"JetBrains Mono", monospace', fontSize:12,
      backdropFilter:'blur(10px)',
      boxShadow:'0 20px 40px rgba(0,0,0,0.4)',
    }}>
      <div onClick={()=>setOpen(!open)} style={{
        padding:'10px 14px', cursor:'pointer',
        borderBottom: open?'1px solid rgba(255,255,255,0.08)':'none',
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span style={{letterSpacing:'0.08em'}}>TWEAKS</span>
        <span style={{opacity:0.5}}>{open?'−':'+'}</span>
      </div>
      {open && <div style={{padding:'12px 14px', display:'grid', gap:14}}>
        <Row label="Accent">
          <div style={{display:'flex', gap:6}}>
            {accentOptions.map(o => (
              <button key={o.id} onClick={()=>update('accent', o.id)} style={{
                width:28, height:28, borderRadius:8, border: tweaks.accent===o.id?'2px solid #fff':'1px solid rgba(255,255,255,0.2)',
                background: o.val, cursor:'pointer', padding:0,
              }} title={o.label}/>
            ))}
          </div>
        </Row>
        <Row label="Background">
          <Segmented opts={bgOptions} value={tweaks.bg} onChange={v=>update('bg',v)}/>
        </Row>
        <Row label="Language">
          <Segmented opts={langOptions} value={tweaks.lang} onChange={v=>update('lang',v)}/>
        </Row>
        <Row label="Density">
          <Segmented opts={[{id:'compact',label:'Compact'},{id:'normal',label:'Normal'},{id:'airy',label:'Airy'}]} value={tweaks.density} onChange={v=>update('density',v)}/>
        </Row>
        <Row label="Works filter">
          <Segmented opts={[{id:'all',label:'All'},{id:'web',label:'Web'},{id:'vr',label:'VR'},{id:'tool',label:'Tool'}]} value={tweaks.filter} onChange={v=>update('filter',v)}/>
        </Row>
        <Row label="Cursor FX">
          <Segmented opts={[{id:'on',label:'On'},{id:'off',label:'Off'}]} value={tweaks.cursor} onChange={v=>update('cursor',v)}/>
        </Row>
      </div>}
    </div>
  );
}

function Row({label, children}) {
  return <div>
    <div style={{fontSize:10, opacity:0.5, marginBottom:6, letterSpacing:'0.1em'}}>{label.toUpperCase()}</div>
    {children}
  </div>;
}

function Segmented({opts, value, onChange}) {
  return <div style={{display:'flex', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, overflow:'hidden'}}>
    {opts.map(o => (
      <button key={o.id} onClick={()=>onChange(o.id)} style={{
        flex:1, padding:'6px 8px', border:'none',
        background: value===o.id ? 'rgba(255,255,255,0.12)' : 'transparent',
        color: value===o.id ? '#fff' : 'rgba(255,255,255,0.6)',
        cursor:'pointer', fontFamily:'inherit', fontSize:11,
      }}>{o.label}</button>
    ))}
  </div>;
}

window.TweaksPanel = TweaksPanel;
