import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components';
import { PROFILE, WORKS } from '../data';
import type { Tweaks, Work } from '../types';

type BoothWork = {
  id: string;
  name: string;
  tag: string;
  desc_jp: string;
  desc_en: string;
  price: string;
  hearts: string;
};

// --- Works (compact) ----------------------------------------------
export function Works({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  const booth: BoothWork[] = [
    {
      id: 'sukesuke',
      name: 'すけすけ位置合わせツール',
      tag: 'BOOTH · Unity',
      desc_jp: '位置合わせ簡単！なんでもスケスケツール',
      desc_en: 'Make-anything-translucent helper for alignment.',
      price: '¥500',
      hearts: '2792',
    },
    {
      id: 'upload-notify',
      name: 'アップロード完了通知ツール',
      tag: 'BOOTH · Unity',
      desc_jp: '音と通知でアップロード完了を知らせる',
      desc_en: 'Sound + notification when uploads finish.',
      price: '¥500',
      hearts: '660',
    },
    {
      id: 'mochi-hoppe',
      name: 'もちもちほっぺツール',
      tag: 'BOOTH · ここあ式',
      desc_jp: 'MA対応・汎用設計。簡単セットアップ！',
      desc_en: 'Squishy-cheek tool. MA-compatible, plug-and-play.',
      price: '¥750',
      hearts: '1583',
    },
    {
      id: 'mesh-color',
      name: 'Mesh Color Tool',
      tag: 'BOOTH · Unity',
      desc_jp: 'メッシュに色を付けれるツール',
      desc_en: 'Paint colors onto meshes.',
      price: '¥500',
      hearts: '6678',
    },
    {
      id: 'enable-editor',
      name: 'Enable / EditorOnly 切替ツール',
      tag: 'BOOTH · 無料',
      desc_jp: 'ワンクリックで切り替え！簡単切り替えツール',
      desc_en: 'One-click Enable/EditorOnly toggler.',
      price: 'Free',
      hearts: '—',
    },
  ];
  const featured = WORKS.filter(w => ['photo-neos', 'novelai'].includes(w.id));

  return (
    <section id="works" data-screen-label="03 Works" style={{ padding: '100px 6vw' }}>
      <SectionHeader num="03" title="Works" subtitle={L ? 'BOOTH tools & a few projects' : 'BOOTHツール＆いろいろ'} />
      <div style={{ maxWidth: 1280, margin: '40px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {booth.map((w, i) => (
            <BoothCard key={w.id} work={w} index={i} L={L} />
          ))}
          {featured.map((w, i) => (
            <MiniWorkCard key={w.id} work={w} index={i + booth.length} L={L} />
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            textAlign: 'center',
            fontSize: 13,
            fontFamily: '"JetBrains Mono", monospace',
            color: 'rgba(238,240,242,0.5)',
          }}
        >
          {L ? 'more on ' : '他いろいろは '}
          <a
            href="https://kokoa0429.booth.pm/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              borderBottom: '1px dashed var(--accent)',
              marginRight: 14,
            }}
          >
            BOOTH ↗
          </a>
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px dashed var(--accent)' }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function BoothCard({ work, index, L }: { work: BoothWork; index: number; L: boolean }) {
  return (
    <div
      style={{
        padding: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(14,16,22,0.4)',
        position: 'relative',
        transition: 'all 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 12,
          fontSize: 10,
          fontFamily: '"JetBrains Mono", monospace',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
        }}
      >
        ♥ {work.hearts}
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: 'var(--accent)',
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}
      >
        {work.tag.toUpperCase()}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          fontFamily: 'Manrope, "Zen Kaku Gothic New", sans-serif',
        }}
      >
        {work.name}
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(238,240,242,0.6)', marginBottom: 12 }}>
        {L ? work.desc_en : work.desc_jp}
      </div>
      <div
        style={{
          fontSize: 12,
          fontFamily: '"JetBrains Mono", monospace',
          color: 'rgba(238,240,242,0.7)',
          paddingTop: 10,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {work.price}
      </div>
    </div>
  );
}

function MiniWorkCard({ work, index, L }: { work: Work; index: number; L: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80 + index * 60);
    if (!ref.current) return () => clearTimeout(t);
    try {
      const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.05 });
      io.observe(ref.current);
      return () => {
        io.disconnect();
        clearTimeout(t);
      };
    } catch (e) {
      return () => clearTimeout(t);
    }
  }, []);
  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(14,16,22,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.5s cubic-bezier(0.2,0.8,0.2,1) ${index * 40}ms`,
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: 'var(--accent)',
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}
      >
        {work.tag.toUpperCase()}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 8,
          fontFamily: 'Manrope, "Zen Kaku Gothic New", sans-serif',
        }}
      >
        {work.name}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(238,240,242,0.6)' }}>
        {L ? work.summary_en : work.summary_jp}
      </div>
    </div>
  );
}
