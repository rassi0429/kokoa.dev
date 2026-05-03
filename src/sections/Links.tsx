import type { SimpleIcon } from 'simple-icons';
import { siGithub, siMisskey, siX } from 'simple-icons';
import { SectionHeader } from '../components';
import { PROFILE_LINKS } from '../data';
import type { ProfileLinkCard, ProfileLinkIcon, Tweaks } from '../types';

type LinkIcon = SimpleIcon | 'resonite' | 'booth';

const LINK_ICONS: Record<ProfileLinkIcon, LinkIcon> = {
  github: siGithub,
  x: siX,
  misskey: siMisskey,
  resonite: 'resonite',
  booth: 'booth',
};

export function Links({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  return (
    <section id="links" data-screen-label="02 Links" style={{ padding: '100px 6vw' }}>
      <SectionHeader num="02" title="Links" subtitle={L ? 'Find me elsewhere' : '他のところでは'} />
      <div style={{ maxWidth: 1280, margin: '40px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 16 }}>
          {PROFILE_LINKS.map(link => (
            <LinkCard key={link.id} link={link} english={L} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkCard({ link, english }: { link: ProfileLinkCard; english: boolean }) {
  const note = english ? link.note_en : link.note_jp;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 178,
        gap: 22,
        padding: '26px 24px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018) 58%, rgba(0,0,0,0.08))',
        textDecoration: 'none',
        color: 'var(--fg)',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.background =
          'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.024) 58%, rgba(0,0,0,0.08))';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background =
          'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018) 58%, rgba(0,0,0,0.08))';
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 'auto 18px 18px auto',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 42,
          lineHeight: 1,
          color: 'rgba(238,240,242,0.04)',
        }}
      >
        {link.id}
      </span>

      <div
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, width: '100%' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
          <div
            style={{
              width: 56,
              height: 56,
              flex: '0 0 56px',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              background: 'rgba(255,255,255,0.035)',
            }}
          >
            <BrandIcon icon={LINK_ICONS[link.icon]} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{link.title}</div>
            <div style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: 'rgba(238,240,242,0.55)' }}>
              {link.sub}
            </div>
          </div>
        </div>
        <span style={{ color: 'rgba(238,240,242,0.45)', fontSize: 18, lineHeight: 1 }}>&#8599;</span>
      </div>

      <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ width: 36, height: 1, background: 'var(--accent)', marginBottom: 14 }} />
        <p style={{ margin: 0, color: 'rgba(238,240,242,0.72)', fontSize: 14, lineHeight: 1.65 }}>{note}</p>
      </div>
    </a>
  );
}

function BrandIcon({ icon }: { icon: LinkIcon }) {
  if (icon === 'resonite') return <ResoniteFallbackIcon />;
  if (icon === 'booth') return <BoothFallbackIcon />;

  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function BoothFallbackIcon() {
  return (
    <svg viewBox="2 8 22 13" width="30" height="30" aria-hidden="true" focusable="false">
      <path
        d="M3.2 15.8h1.2c.8 0 1.4-.4 1.8-1.1l1.3-2.4c.5-.9 1.2-1.4 2.1-1.4 1 0 1.7.6 2.2 1.7l.4.9.9-1.9c.6-1.2 1.5-1.9 2.6-1.9 1.3 0 2.2.8 2.7 2.3l.5 1.5 1-.5c.7-.3 1.5-.1 1.9.6l.7 1.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M7.6 15.8v3.2M10.8 15.8l-.7 3.2M16.2 15.8v3.2M19 15.6l.9 3.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <circle cx="21.1" cy="13.2" r="0.55" fill="currentColor" />
    </svg>
  );
}

function ResoniteFallbackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <circle cx="7.5" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.9 10.1 14.1 13.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}
