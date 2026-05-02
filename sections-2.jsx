// Works (compact) + Skills (compact) + Orgs (compact) + Gallery + Footer
const { useState: useStateW, useRef: useRefW, useEffect: useEffectW } = React;

// --- Works (compact) ----------------------------------------------
function Works({ tweaks }) {
  const L = tweaks.lang === 'en';
  const booth = [
    { id:'sukesuke', name:'すけすけ位置合わせツール', tag:'BOOTH · Unity', desc_jp:'位置合わせ簡単！なんでもスケスケツール', desc_en:'Make-anything-translucent helper for alignment.', price:'¥500', hearts:'2792' },
    { id:'upload-notify', name:'アップロード完了通知ツール', tag:'BOOTH · Unity', desc_jp:'音と通知でアップロード完了を知らせる', desc_en:'Sound + notification when uploads finish.', price:'¥500', hearts:'660' },
    { id:'mochi-hoppe', name:'もちもちほっぺツール', tag:'BOOTH · ここあ式', desc_jp:'MA対応・汎用設計。簡単セットアップ！', desc_en:'Squishy-cheek tool. MA-compatible, plug-and-play.', price:'¥750', hearts:'1583' },
    { id:'mesh-color', name:'Mesh Color Tool', tag:'BOOTH · Unity', desc_jp:'メッシュに色を付けれるツール', desc_en:'Paint colors onto meshes.', price:'¥500', hearts:'6678' },
    { id:'enable-editor', name:'Enable / EditorOnly 切替ツール', tag:'BOOTH · 無料', desc_jp:'ワンクリックで切り替え！簡単切り替えツール', desc_en:'One-click Enable/EditorOnly toggler.', price:'Free', hearts:'—' },
  ];
  const featured = WORKS.filter(w => ['photo-neos','novelai'].includes(w.id));

  return (
    <section id="works" data-screen-label="03 Works" style={{padding:'100px 6vw'}}>
      <SectionHeader num="03" title="Works" subtitle={L?"BOOTH tools & a few projects":"BOOTHツール＆いろいろ"}/>
      <div style={{maxWidth:1280, margin:'40px auto 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:14}}>
          {booth.map((w, i) => <BoothCard key={w.id} work={w} index={i} L={L}/>)}
          {featured.map((w, i) => <MiniWorkCard key={w.id} work={w} index={i+booth.length} L={L}/>)}
        </div>
        <div style={{marginTop:24, textAlign:'center', fontSize:13, fontFamily:'"JetBrains Mono", monospace', color:'rgba(238,240,242,0.5)'}}>
          {L ? "more on " : "他いろいろは "}
          <a href="https://kokoa0429.booth.pm/" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)', textDecoration:'none', borderBottom:'1px dashed var(--accent)', marginRight:14}}>BOOTH ↗</a>
          <a href={PROFILE.links.github} target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)', textDecoration:'none', borderBottom:'1px dashed var(--accent)'}}>GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}

function BoothCard({work, index, L}) {
  return (
    <div style={{
      padding:20, border:'1px solid rgba(255,255,255,0.08)',
      background:'rgba(14,16,22,0.4)', position:'relative',
      transition:'all 0.3s',
    }}
    onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'}
    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}>
      <div style={{position:'absolute', top:10, right:12, fontSize:10, fontFamily:'"JetBrains Mono", monospace', color:'var(--accent)', letterSpacing:'0.1em'}}>♥ {work.hearts}</div>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'var(--accent)', letterSpacing:'0.15em', marginBottom:8}}>
        {work.tag.toUpperCase()}
      </div>
      <div style={{fontSize:16, fontWeight:600, marginBottom:8, fontFamily:'Manrope, "Zen Kaku Gothic New", sans-serif'}}>
        {work.name}
      </div>
      <div style={{fontSize:12, lineHeight:1.6, color:'rgba(238,240,242,0.6)', marginBottom:12}}>
        {L ? work.desc_en : work.desc_jp}
      </div>
      <div style={{fontSize:12, fontFamily:'"JetBrains Mono", monospace', color:'rgba(238,240,242,0.7)', paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.06)'}}>{work.price}</div>
    </div>
  );
}

function MiniWorkCard({work, index, L}) {
  const ref = useRefW(null);
  const [visible, setVisible] = useStateW(false);
  useEffectW(() => {
    const t = setTimeout(() => setVisible(true), 80 + index * 60);
    if (!ref.current) return () => clearTimeout(t);
    try {
      const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {threshold:0.05});
      io.observe(ref.current);
      return () => { io.disconnect(); clearTimeout(t); };
    } catch (e) { return () => clearTimeout(t); }
  }, []);
  return (
    <div ref={ref} style={{
      padding:20, border:'1px solid rgba(255,255,255,0.08)',
      background:'rgba(14,16,22,0.4)',
      opacity: visible?1:0,
      transform: visible?'translateY(0)':'translateY(16px)',
      transition:`all 0.5s cubic-bezier(0.2,0.8,0.2,1) ${index*40}ms`,
    }}
    onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'}
    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'var(--accent)', letterSpacing:'0.15em', marginBottom:8}}>
        {work.tag.toUpperCase()}
      </div>
      <div style={{fontSize:18, fontWeight:600, marginBottom:8, fontFamily:'Manrope, "Zen Kaku Gothic New", sans-serif'}}>
        {work.name}
      </div>
      <div style={{fontSize:13, lineHeight:1.6, color:'rgba(238,240,242,0.6)'}}>
        {L ? work.summary_en : work.summary_jp}
      </div>
    </div>
  );
}

// --- Skills (compact) ---------------------------------------------
function Skills({ tweaks }) {
  const L = tweaks.lang === 'en';
  return (
    <section id="skills" data-screen-label="04 Stack" style={{padding:'100px 6vw'}}>
      <SectionHeader num="04" title="Stack" subtitle={L?"Tools I reach for":"普段触っているもの"}/>
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

// --- Gallery (masonry) --------------------------------------------
const GALLERY = Array.from({length:20}, (_, i) => {
  // Mix of heights for masonry feel — deterministic so it's stable
  const heights = [320, 240, 380, 280, 340, 220, 360, 300, 260, 400, 240, 320, 280, 360, 220, 340, 300, 380, 260, 320];
  // Hue rotation for placeholder variety
  const hues = [200, 220, 250, 280, 240, 210, 260, 230, 200, 270, 240, 220, 250, 210, 280, 230, 260, 240, 220, 200];
  const captions = [
    'Resonite · 散歩中', 'VRChat · friends', 'Resonite · ワールド探索',
    'VRChat · イベント', 'Resonite · 工作中', '少年アバター', 'メイド服 work mode',
    'Resonite · 夜景', 'VRChat · 集合写真', 'お出かけ',
    'Resonite · 開発テスト', 'VRChat · まったり', '黒上着+黄緑',
    'Resonite · 空', 'VRChat · 鏡前', 'カメラ目線',
    'Resonite · 配信', 'VRChat · ライブ', '誰かのワールドにて', 'こっち向いて'
  ];
  return { id:i, h: heights[i], hue: hues[i], caption: captions[i] };
});

function Gallery({ tweaks }) {
  const L = tweaks.lang === 'en';
  const [openIdx, setOpenIdx] = useStateW(null);
  const ref = useRefW(null);
  const [visible, setVisible] = useStateW(false);

  useEffectW(() => {
    if (!ref.current) return;
    try {
      const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {threshold:0.05});
      io.observe(ref.current);
      return () => io.disconnect();
    } catch (e) {}
  }, []);

  useEffectW(() => {
    if (openIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx(i => (i+1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setOpenIdx(i => (i-1+GALLERY.length) % GALLERY.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx]);

  return (
    <section id="gallery" data-screen-label="05 Gallery" ref={ref} style={{padding:'100px 6vw'}}>
      <SectionHeader num="05" title="Gallery" subtitle={L?"Photos from VR":"VRからのスナップ"}/>
      <div style={{maxWidth:1400, margin:'40px auto 0'}}>
        <div style={{
          columnCount: 4,
          columnGap: 14,
        }} className="masonry-cols">
          {GALLERY.map((g, i) => (
            <PhotoTile key={g.id} g={g} i={i} visible={visible} onOpen={()=>setOpenIdx(i)}/>
          ))}
        </div>
        <div style={{marginTop:24, fontSize:11, fontFamily:'"JetBrains Mono", monospace', color:'rgba(238,240,242,0.4)', textAlign:'center'}}>
          {L?"// Click any tile to enlarge · ←/→ to browse · Esc to close":"// クリックで拡大 · ←/→で移動 · Escで閉じる"}
        </div>
      </div>
      {openIdx !== null && <Lightbox idx={openIdx} setIdx={setOpenIdx}/>}
    </section>
  );
}

function PhotoTile({ g, i, visible, onOpen }) {
  return (
    <div onClick={onOpen} style={{
      breakInside:'avoid',
      marginBottom: 14,
      height: g.h,
      position:'relative',
      cursor:'pointer',
      border:'1px solid rgba(255,255,255,0.06)',
      overflow:'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s cubic-bezier(0.2,0.8,0.2,1) ${i*30}ms`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor='var(--accent)';
      const img = e.currentTarget.querySelector('.photo-bg');
      if (img) img.style.transform='scale(1.05)';
      const cap = e.currentTarget.querySelector('.photo-cap');
      if (cap) cap.style.transform='translateY(0)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';
      const img = e.currentTarget.querySelector('.photo-bg');
      if (img) img.style.transform='scale(1)';
      const cap = e.currentTarget.querySelector('.photo-cap');
      if (cap) cap.style.transform='translateY(100%)';
    }}>
      {/* placeholder gradient */}
      <div className="photo-bg" style={{
        position:'absolute', inset:0,
        background:`linear-gradient(${135+i*7}deg, oklch(0.35 0.12 ${g.hue}) 0%, oklch(0.18 0.08 ${g.hue+30}) 50%, oklch(0.12 0.04 ${g.hue}) 100%)`,
        transition:'transform 0.6s cubic-bezier(0.2,0.8,0.2,1)',
      }}/>
      {/* placeholder pattern */}
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.15}}>
        <defs>
          <pattern id={`grid-${i}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${i})`}/>
      </svg>
      {/* placeholder mark */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        fontFamily:'"JetBrains Mono", monospace',
        fontSize:11, color:'rgba(255,255,255,0.3)',
        letterSpacing:'0.2em',
      }}>IMG_{String(i+1).padStart(3,'0')}</div>
      {/* corner index */}
      <div style={{
        position:'absolute', top:8, left:10,
        fontFamily:'"JetBrains Mono", monospace', fontSize:10,
        color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em',
      }}>{String(i+1).padStart(2,'0')}/{GALLERY.length}</div>
      {/* caption hover */}
      <div className="photo-cap" style={{
        position:'absolute', left:0, right:0, bottom:0,
        padding:'14px 14px 12px',
        background:'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
        fontSize:12, color:'#fff',
        transform:'translateY(100%)', transition:'transform 0.3s',
      }}>{g.caption}</div>
    </div>
  );
}

function Lightbox({ idx, setIdx }) {
  const g = GALLERY[idx];
  return (
    <div onClick={()=>setIdx(null)} style={{
      position:'fixed', inset:0, background:'rgba(5,6,9,0.94)',
      backdropFilter:'blur(8px)',
      zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center',
      animation:'fadeIn 0.2s ease',
    }}>
      <button onClick={e => { e.stopPropagation(); setIdx(i=>(i-1+GALLERY.length)%GALLERY.length); }} style={lbBtn('left')}>‹</button>
      <button onClick={e => { e.stopPropagation(); setIdx(i=>(i+1)%GALLERY.length); }} style={lbBtn('right')}>›</button>
      <button onClick={e => { e.stopPropagation(); setIdx(null); }} style={{
        position:'absolute', top:20, right:24, fontSize:18, color:'#fff',
        background:'transparent', border:'none', cursor:'pointer',
        fontFamily:'"JetBrains Mono", monospace', letterSpacing:'0.1em',
      }}>ESC ✕</button>
      <div onClick={e => e.stopPropagation()} style={{
        width:'min(900px, 80vw)', height:'min(680px, 80vh)',
        position:'relative', border:'1px solid rgba(255,255,255,0.15)',
        background:`linear-gradient(${135+idx*7}deg, oklch(0.4 0.14 ${g.hue}) 0%, oklch(0.18 0.08 ${g.hue+30}) 50%, oklch(0.12 0.04 ${g.hue}) 100%)`,
      }}>
        <div style={{
          position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          fontFamily:'"JetBrains Mono", monospace',
          fontSize:14, color:'rgba(255,255,255,0.4)', letterSpacing:'0.2em',
        }}>IMG_{String(idx+1).padStart(3,'0')}</div>
        <div style={{
          position:'absolute', left:0, right:0, bottom:0,
          padding:'18px 24px',
          background:'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          color:'#fff',
          display:'flex', justifyContent:'space-between', alignItems:'center',
        }}>
          <span style={{fontSize:14}}>{g.caption}</span>
          <span style={{fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'rgba(255,255,255,0.5)'}}>{idx+1} / {GALLERY.length}</span>
        </div>
      </div>
    </div>
  );
}

function lbBtn(side) {
  return {
    position:'absolute', [side]:24, top:'50%', transform:'translateY(-50%)',
    width:48, height:48, borderRadius:24,
    background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.2)',
    color:'#fff', fontSize:24, cursor:'pointer',
    display:'flex', alignItems:'center', justifyContent:'center',
  };
}

// --- Orgs (inline strip) ------------------------------------------
function Orgs({ tweaks }) {
  const L = tweaks.lang === 'en';
  const subset = ORGS.slice(0, 5); // just a few
  return (
    <section id="orgs" data-screen-label="06 Orgs" style={{padding:'70px 6vw'}}>
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

// --- Footer / Links ----------------------------------------------
function Footer({ tweaks }) {
  const L = tweaks.lang === 'en';
  return (
    <section id="links" data-screen-label="07 Links" style={{padding:'80px 6vw 60px'}}>
      <SectionHeader num="07" title="Links" subtitle={L?"Find me elsewhere":"他のところでは"}/>
      <div style={{maxWidth:1280, margin:'40px auto 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12}}>
          <LinkCard href={PROFILE.links.github} title="GitHub" sub="@kokoa0429" icon="gh"/>
          <LinkCard href={PROFILE.links.x} title="X / Twitter" sub="@ciel_vr" icon="x"/>
          <LinkCard href={PROFILE.links.misskey} title="Misskey" sub="@kokoa_" icon="ms"/>
          <LinkCard href={PROFILE.links.resonite} title="Resonite" sub="resonite.love" icon="re"/>
        </div>
        <div style={{marginTop:80, paddingTop:40, borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, fontFamily:'"JetBrains Mono", monospace', color:'rgba(238,240,242,0.4)'}}>
          <div>© 2024—2026 KOKOA (@kokoa0429)</div>
          <div>Built with {'<'}3 in HTML/React</div>
        </div>
      </div>
    </section>
  );
}

function LinkCard({href, title, sub, icon}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{
    display:'flex', alignItems:'center', gap:14, padding:20,
    border:'1px solid rgba(255,255,255,0.08)',
    background:'rgba(14,16,22,0.4)',
    textDecoration:'none', color:'var(--fg)',
    transition:'all 0.2s', position:'relative',
  }}
  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)';}}
  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='translateY(0)';}}>
    <div style={{width:40, height:40, border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'var(--accent)'}}>{icon}</div>
    <div style={{flex:1}}>
      <div style={{fontSize:14, fontWeight:600}}>{title}</div>
      <div style={{fontSize:11, fontFamily:'"JetBrains Mono", monospace', color:'rgba(238,240,242,0.5)'}}>{sub}</div>
    </div>
    <span style={{color:'rgba(238,240,242,0.4)'}}>↗</span>
  </a>;
}

window.Works = Works;
window.Skills = Skills;
window.Orgs = Orgs;
window.Gallery = Gallery;
window.Footer = Footer;
