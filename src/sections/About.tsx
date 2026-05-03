import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { SectionHeader } from '../components';
import { PROFILE } from '../data';
import type { Tweaks } from '../types';

// --- About ---------------------------------------------------------
export function About({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  const [typed, setTyped] = useState('');
  const full = `$ whoami\nKOKOA (@kokoa0429) — ${PROFILE.role}\n\n$ cat about.txt`;
  const typingDone = typed.length >= full.length;

  useEffect(() => {
    const el = document.getElementById('about');
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && typed === '') {
          let i = 0;
          const id = setInterval(() => {
            setTyped(full.slice(0, i++));
            if (i > full.length) clearInterval(id);
          }, 28);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [typed]);

  return (
    <section id="about" data-screen-label="03 About" style={{ padding: '120px 6vw', position: 'relative' }}>
      <SectionHeader num="03" title="About" subtitle={L ? 'Who I am' : '自己紹介'} />
      <div
        style={{ maxWidth: 1280, margin: '40px auto 0', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}
      >
        {/* Terminal panel */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(8,9,13,0.6)',
            borderRadius: 8,
            fontFamily: '"JetBrains Mono", monospace',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#febc2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28c840' }} />
            <span style={{ marginLeft: 16 }}>~/kokoa — zsh</span>
          </div>
          <div style={{ padding: 24, fontSize: 13, lineHeight: 1.8, minHeight: 320, whiteSpace: 'pre-wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{typed}</span>
            {!typingDone && <TerminalCursor />}
            {typingDone && (
              <div style={{ marginTop: 16, color: 'rgba(238,240,242,0.75)' }}>
                {L ? PROFILE.bio_en : PROFILE.bio_jp}
                <div style={{ marginTop: 20, color: 'rgba(255,255,255,0.4)' }}>
                  $ <span style={{ color: 'var(--accent)' }}>echo $MOTTO</span>
                </div>
                <div style={{ color: 'rgba(238,240,242,0.9)' }}>"{L ? PROFILE.tagline_en : PROFILE.tagline_jp}"</div>
                <div style={{ marginTop: 20, color: 'rgba(255,255,255,0.4)' }}>
                  $ <TerminalCursor />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info card */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(14,16,22,0.4)',
            padding: 32,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <InfoRow k={L ? 'Name' : '名前'} v={`${PROFILE.name} (${PROFILE.alias})`} />
          <InfoRow k={L ? 'Role' : '所属'} v={PROFILE.role} />
          <InfoRow k={L ? 'Location' : '拠点'} v={PROFILE.location} />
          <InfoRow k={L ? 'Primary' : '主戦場'} v="Resonite · VRChat" />
          <InfoRow k={L ? 'Avatar' : 'アバター'} v={L ? 'Boyish (this one)' : '少年寄り（これ）'} />
          <InfoRow k={L ? 'Work wear' : '仕事着'} v={L ? 'Maid outfit 🩷' : 'メイド服 🩷'} />
          <InfoRow k={L ? 'Stack' : 'スタック'} v="TS / Vue / React / C# / Node" />
          <InfoRow k="GitHub" v="@kokoa0429" />
          <InfoRow k="X" v="@ciel_vr" />
          <div
            style={{
              marginTop: 'auto',
              padding: 16,
              border: '1px dashed var(--accent)',
              color: 'var(--accent)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
            }}
          >
            <div style={{ opacity: 0.6, fontSize: 10, letterSpacing: '0.15em', marginBottom: 6 }}>STATUS</div>
            <div>● Available for collaboration</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalCursor() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 8,
        height: '1.2em',
        marginLeft: 2,
        background: 'var(--accent)',
        animation: 'blink 1s step-end infinite',
        verticalAlign: '-0.2em',
      }}
    />
  );
}

function InfoRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        gap: 16,
        fontSize: 14,
        paddingBottom: 12,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          color: 'rgba(238,240,242,0.4)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          paddingTop: 2,
          letterSpacing: '0.05em',
        }}
      >
        {k}
      </div>
      <div>{v}</div>
    </div>
  );
}
