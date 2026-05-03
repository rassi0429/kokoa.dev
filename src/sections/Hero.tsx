import type { CSSProperties, ReactNode } from 'react';
import avatarMaid from '../../assets/avatar-maid.png';
import avatarWeb from '../../assets/avatar-web.png';
import type { MouseState, PersonaMode, Tweaks } from '../types';

type HeroChip = { ico: string; label: string };
type HeroCopy = {
  kicker: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  chips: HeroChip[];
  floating: string[];
  panelLines: string[];
};

function getHeroCopy(persona: PersonaMode, english: boolean): HeroCopy {
  if (persona === 'work') {
    return {
      kicker: english ? 'WORK MODE / VR x WEB x HARDWARE' : '仕事の姿',
      body: english
        ? 'I mainly build around VR and the web, and I also work on PCB design, FPGA, and IoT projects. I want to become a full-stack developer.'
        : 'VRやWebをメインに、基板設計やFPGA、IoT周りの開発もしています。フルスタックになりたい。',
      primaryCta: english ? 'View Works' : 'Works を見る',
      secondaryCta: english ? 'About Me' : 'About',
      chips: [
        { ico: '01', label: 'VR' },
        { ico: '02', label: 'Web' },
        { ico: '03', label: 'NodeJS' },
        { ico: '04', label: 'FPGA' },
        { ico: '05', label: 'IoT' },
      ],
      floating: ['WeaverseLab', english ? 'IA Project' : 'いあぷろじぇくと', 'kokoa inc.'],
      panelLines: [
        'const KOKOA = async () => {',
        '  await connect("vr-and-web");',
        '  while (coffee.remaining) {',
        '    ship(await build());',
        '  }',
        '  return betterTools;',
        '};',
        '',
        '// work mode',
        'export default KOKOA;',
      ],
    };
  }

  return {
    kicker: english ? 'MAKE WHAT I WANT TO MAKE!' : '作りたいものをつくる！',
    body: english
      ? 'I go back and forth between Resonite and VRChat, wandering worlds, taking photos, and relaxing as a boyish avatar. I make the things I end up wanting during that everyday VR life, then share them on places like Booth.'
      : 'Resonite と VRChat を行ったり来たりしながら、ワールドを散歩したり、写真を撮ったり、少年アバターでゆっくり過ごしています。 \n 普段過ごす間に作りたくなったものを作って、Boothなどで公開しています！',
    primaryCta: english ? 'Open Links' : 'Links を見る',
    secondaryCta: english ? 'About Me' : 'About',
    chips: [
      { ico: '♪', label: english ? 'Making things in Resonite' : 'Resoniteで何かを作る' },
      { ico: '✶', label: english ? 'Chatting in VRChat' : 'VRChatでだべる' },
      { ico: '◈', label: english ? 'Boyish avatar' : '少年アバター' },
      { ico: '◉', label: 'Booth' },
      { ico: '◐', label: english ? 'Making stuff' : '創作' },
      { ico: '◇', label: english ? 'World hopping' : 'ワールド巡り' },
      { ico: '◎', label: english ? 'Taking photos' : '写真を撮る' },
    ],
    floating: ['Resonite', 'VRChat', 'Booth'],
    panelLines: [
      'Resonite world hopping',
      'VRChat friends night',
      'making things in Resonite',
      'Booth release notes',
      'photos after midnight',
      '',
      'status: relaxed',
      'mood: make what I want',
    ],
  };
}

// --- Hero -----------------------------------------------------------
export function Hero({ tweaks, mouse, persona }: { tweaks: Tweaks; mouse: MouseState; persona: PersonaMode }) {
  const L = tweaks.lang === 'en';
  const copy = getHeroCopy(persona, L);
  const isWork = persona === 'work';
  const parallaxX = mouse.x * 20;
  const parallaxY = mouse.y * 15;

  return (
    <section data-screen-label="01 Hero" style={{
      minHeight:'100vh', position:'relative', overflow:'hidden',
      display:'flex', alignItems:'center', padding:'120px 6vw 80px',
    }}>
      {/* Background effects */}
      <BgFx tweaks={tweaks}/>

      {/* Decorative angled lines */}
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.35}}>
        <line x1="55%" y1="0" x2="35%" y2="100%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 8"/>
        <line x1="70%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      </svg>

      <div style={{maxWidth:1280, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1.15fr 1fr', gap:40, alignItems:'center', position:'relative', zIndex:2}}>
        <div>
          <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:13, color:'var(--accent)', marginBottom:20, letterSpacing:'0.15em', display:'flex', alignItems:'center', gap:12}}>
            <span style={{display:'inline-block', width:32, height:1, background:'var(--accent)'}}/>
            <span>{copy.kicker}</span>
          </div>
          <h1 style={{
            fontSize:'clamp(56px, 9vw, 132px)', lineHeight:0.92, fontWeight:800,
            letterSpacing:'-0.04em', margin:'0 0 8px',
            fontFamily:'Manrope, "Zen Kaku Gothic New", sans-serif',
          }}>
            <span style={{display:'block'}}>KOKOA</span>
            <span style={{display:'block', color:'var(--accent)', fontFamily:'"JetBrains Mono", monospace', fontSize:'0.28em', fontWeight:500, letterSpacing:'0.02em', marginTop:10}}>
              @kokoa0429
            </span>
          </h1>
          <p style={{
            fontSize:18, lineHeight:1.7, maxWidth:540, margin:'36px 0 40px',
            color:'rgba(238,240,242,0.75)',
          }}>
            {copy.body}
          </p>

          <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <CTA primary onClick={()=>document.getElementById(isWork ? 'works' : 'links')?.scrollIntoView({behavior:'smooth'})}>
              {copy.primaryCta} <Arrow/>
            </CTA>
            <CTA onClick={()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>
              {copy.secondaryCta}
            </CTA>
          </div>

          <div style={{display:'flex', gap:10, marginTop:48, flexWrap:'wrap', fontSize:12, fontFamily:'"JetBrains Mono", monospace'}}>
            {copy.chips.map(l => (
              <div key={l.label} style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'7px 12px',
                border:'1px solid rgba(255,255,255,0.1)',
                background:'rgba(255,255,255,0.02)',
                color:'rgba(238,240,242,0.75)',
              }}>
                <span style={{color:'var(--accent)'}}>{l.ico}</span>
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar column */}
        <div className="hero-avatar-stage" style={{
          position:'relative',
          transform:`translate(${parallaxX}px, ${parallaxY}px)`,
          transition:'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}>
          {/* Code rain panel behind */}
          <div style={{
            position:'absolute', inset:'10% -5% 10% 10%',
            border:'1px solid rgba(255,255,255,0.06)',
            background:'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)',
            borderRadius:2,
            overflow:'hidden',
          }}>
            <ModePanel lines={copy.panelLines} persona={persona} />
          </div>
          {/* Accent bars */}
          <div style={{position:'absolute', top:'8%', right:'5%', width:2, height:80, background:'var(--accent)'}}/>
          <div style={{position:'absolute', top:'8%', right:'5%', width:40, height:2, background:'var(--accent)'}}/>
          <div style={{position:'absolute', bottom:'8%', left:'5%', width:2, height:60, background:'rgba(255,255,255,0.3)'}}/>

          {/* Avatar flip card — 3D rotate to swap between 2 poses */}
          <div style={{
            position:'absolute', bottom:0, right:0, height:'100%', width:'100%',
            perspective:'1600px',
            transform:`translate(${-parallaxX*0.5}px, ${-parallaxY*0.3}px)`,
          }}>
            <div className="avatar-flipper" style={{
              position:'absolute', inset:0,
              transformStyle:'preserve-3d',
              transform: isWork ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition:'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)',
            }}>
              <img className="hero-avatar-image" src={avatarWeb} alt="KOKOA avatar A"
                style={{
                  backfaceVisibility:'hidden',
                  WebkitBackfaceVisibility:'hidden',
                }}/>
              <img className="hero-avatar-image" src={avatarMaid} alt="KOKOA work outfit maid avatar"
                style={{
                  backfaceVisibility:'hidden',
                  WebkitBackfaceVisibility:'hidden',
                  transform:'rotateY(180deg)',
                }}/>
            </div>
          </div>

          {/* Floating tag chips */}
          <FloatingChip style={{top:'14%', left:'2%', animationDelay:'0s'}} label={copy.floating[0]}/>
          <FloatingChip style={{top:'44%', left:'-2%', animationDelay:'1.2s'}} label={copy.floating[1]}/>
          <FloatingChip style={{bottom:'18%', right:'2%', animationDelay:'2.4s'}} label={copy.floating[2]}/>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
        fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.3em',
        color:'rgba(238,240,242,0.4)', display:'flex', flexDirection:'column', alignItems:'center', gap:8,
      }}>
        <span>SCROLL</span>
        <span style={{width:1, height:24, background:'linear-gradient(to bottom, var(--accent), transparent)'}}/>
      </div>
    </section>
  );
}

function CTA({ children, onClick, primary = false }: { children: ReactNode; onClick: () => void; primary?: boolean }) {
  return <button onClick={onClick} style={{
    padding:'14px 24px', fontSize:14, fontWeight:500,
    background: primary ? 'var(--accent)' : 'transparent',
    color: primary ? '#0a0b0f' : 'var(--fg)',
    border: primary ? 'none' : '1px solid rgba(255,255,255,0.2)',
    cursor:'pointer', fontFamily:'inherit',
    display:'inline-flex', alignItems:'center', gap:8,
    transition:'all 0.2s', borderRadius:0,
  }}
  onMouseEnter={e=>{
    if(!primary) e.currentTarget.style.borderColor='var(--accent)';
    e.currentTarget.style.transform='translate(2px,-2px)';
    e.currentTarget.style.boxShadow= primary ? '-4px 4px 0 rgba(255,255,255,0.15)' : '-4px 4px 0 var(--accent)';
  }}
  onMouseLeave={e=>{
    if(!primary) e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';
    e.currentTarget.style.transform='translate(0,0)';
    e.currentTarget.style.boxShadow='none';
  }}>{children}</button>;
}

function Arrow() {
  return <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5"/></svg>;
}

function FloatingChip({ style, label }: { style: CSSProperties; label: string }) {
  return <div style={{
    position:'absolute', padding:'6px 12px',
    border:'1px solid var(--accent)',
    background:'rgba(10,11,15,0.8)', backdropFilter:'blur(8px)',
    fontFamily:'"JetBrains Mono", monospace', fontSize:11,
    color:'var(--accent)', letterSpacing:'0.05em',
    animation:'floatChip 4s ease-in-out infinite',
    ...style,
  }}>{label}</div>;
}

function ModePanel({ lines, persona }: { lines: string[]; persona: PersonaMode }) {
  const repeated = persona === 'work' ? lines.join('\n').repeat(3) : lines.join('\n\n');
  return <pre style={{
    fontFamily:'"JetBrains Mono", monospace',
    fontSize:11,
    lineHeight: persona === 'work' ? 1.7 : 1.9,
    color:'rgba(238,240,242,0.24)',
    margin:0, padding:20,
    userSelect:'none',
    whiteSpace:'pre',
  }}>{repeated}</pre>;
}

function BgFx({ tweaks }: { tweaks: Tweaks }) {
  if (tweaks.bg === 'plain') return null;
  if (tweaks.bg === 'grid') return <div style={{
    position:'absolute', inset:0,
    backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
    backgroundSize:'60px 60px',
    maskImage:'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
  }}/>;
  if (tweaks.bg === 'dots') return <div style={{
    position:'absolute', inset:0,
    backgroundImage:'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
    backgroundSize:'24px 24px',
    maskImage:'radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)',
  }}/>;
  if (tweaks.bg === 'noise') return <div style={{
    position:'absolute', inset:0, opacity:0.4,
    background:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.3'/></svg>\")",
  }}/>;
  return null;
}
