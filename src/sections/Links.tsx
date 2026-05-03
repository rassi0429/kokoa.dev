import type { SimpleIcon } from 'simple-icons';
import { siGithub, siMisskey, siX } from 'simple-icons';
import { SectionHeader } from '../components';
import { PROFILE } from '../data';
import type { Tweaks } from '../types';

type LinkIcon = SimpleIcon | 'resonite';
type ProfileLink = { href: string; title: string; sub: string; icon: LinkIcon };

// --- Links --------------------------------------------------------
const PROFILE_LINKS: ProfileLink[] = [
  { href: PROFILE.links.github, title: 'GitHub', sub: '@kokoa0429', icon: siGithub },
  { href: PROFILE.links.x, title: 'X / Twitter', sub: '@ciel_vr', icon: siX },
  { href: PROFILE.links.misskey, title: 'Misskey', sub: '@kokoa_', icon: siMisskey },
  { href: PROFILE.links.resonite, title: 'Resonite', sub: 'resonite.love', icon: 'resonite' },
];

export function Links({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  return (
    <section id="links" data-screen-label="02 Links" style={{padding:'100px 6vw'}}>
      <SectionHeader num="02" title="Links" subtitle={L?"Find me elsewhere":"他のところでは"}/>
      <div style={{maxWidth:1280, margin:'40px auto 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12}}>
          {PROFILE_LINKS.map((link) => (
            <LinkCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkCard({ href, title, sub, icon }: ProfileLink) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{
    display:'flex', alignItems:'center', gap:14, padding:20,
    border:'1px solid rgba(255,255,255,0.08)',
    background:'rgba(14,16,22,0.4)',
    textDecoration:'none', color:'var(--fg)',
    transition:'all 0.2s', position:'relative',
  }}
  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)';}}
  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='translateY(0)';}}>
    <div style={{width:44, height:44, flex:'0 0 44px', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)', background:'rgba(255,255,255,0.03)'}}>
      <BrandIcon icon={icon} />
    </div>
    <div style={{flex:1}}>
      <div style={{fontSize:14, fontWeight:600}}>{title}</div>
      <div style={{fontSize:11, fontFamily:'"JetBrains Mono", monospace', color:'rgba(238,240,242,0.5)'}}>{sub}</div>
    </div>
    <span style={{color:'rgba(238,240,242,0.4)'}}>&#8599;</span>
  </a>;
}

function BrandIcon({ icon }: { icon: LinkIcon }) {
  if (icon === 'resonite') return <ResoniteFallbackIcon />;

  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function ResoniteFallbackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <circle cx="7.5" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.9 10.1 14.1 13.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}
