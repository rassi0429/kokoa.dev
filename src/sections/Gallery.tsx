import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components';
import type { Tweaks } from '../types';

type GalleryItem = { id: number; h: number; hue: number; caption: string };

// --- Gallery (masonry) --------------------------------------------
const GALLERY: GalleryItem[] = Array.from({ length: 20 }, (_, i) => {
  // Mix of heights for masonry feel — deterministic so it's stable
  const heights = [320, 240, 380, 280, 340, 220, 360, 300, 260, 400, 240, 320, 280, 360, 220, 340, 300, 380, 260, 320];
  // Hue rotation for placeholder variety
  const hues = [200, 220, 250, 280, 240, 210, 260, 230, 200, 270, 240, 220, 250, 210, 280, 230, 260, 240, 220, 200];
  const captions = [
    'Resonite · 散歩中',
    'VRChat · friends',
    'Resonite · ワールド探索',
    'VRChat · イベント',
    'Resonite · 工作中',
    '少年アバター',
    'メイド服 work mode',
    'Resonite · 夜景',
    'VRChat · 集合写真',
    'お出かけ',
    'Resonite · 開発テスト',
    'VRChat · まったり',
    '黒上着+黄緑',
    'Resonite · 空',
    'VRChat · 鏡前',
    'カメラ目線',
    'Resonite · 配信',
    'VRChat · ライブ',
    '誰かのワールドにて',
    'こっち向いて',
  ];
  return { id: i, h: heights[i], hue: hues[i], caption: captions[i] };
});

export function Gallery({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    try {
      const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.05 });
      io.observe(ref.current);
      return () => io.disconnect();
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx(i => (i === null ? 0 : (i + 1) % GALLERY.length));
      if (e.key === 'ArrowLeft')
        setOpenIdx(i => (i === null ? GALLERY.length - 1 : (i - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx]);

  return (
    <section id="gallery" data-screen-label="06 Gallery" ref={ref} style={{ padding: '100px 6vw' }}>
      <SectionHeader num="06" title="Gallery" subtitle={L ? 'Photos from VR' : 'VRからのスナップ'} />
      <div style={{ maxWidth: 1400, margin: '40px auto 0' }}>
        <div
          style={{
            columnCount: 4,
            columnGap: 14,
          }}
          className="masonry-cols"
        >
          {GALLERY.map((g, i) => (
            <PhotoTile key={g.id} g={g} i={i} visible={visible} onOpen={() => setOpenIdx(i)} />
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 11,
            fontFamily: '"JetBrains Mono", monospace',
            color: 'rgba(238,240,242,0.4)',
            textAlign: 'center',
          }}
        >
          {L
            ? '// Click any tile to enlarge · ←/→ to browse · Esc to close'
            : '// クリックで拡大 · ←/→で移動 · Escで閉じる'}
        </div>
      </div>
      {openIdx !== null && <Lightbox idx={openIdx} setIdx={setOpenIdx} />}
    </section>
  );
}

function PhotoTile({ g, i, visible, onOpen }: { g: GalleryItem; i: number; visible: boolean; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      style={{
        breakInside: 'avoid',
        marginBottom: 14,
        height: g.h,
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.2,0.8,0.2,1) ${i * 30}ms`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        const img = e.currentTarget.querySelector<HTMLElement>('.photo-bg');
        if (img) img.style.transform = 'scale(1.05)';
        const cap = e.currentTarget.querySelector<HTMLElement>('.photo-cap');
        if (cap) cap.style.transform = 'translateY(0)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        const img = e.currentTarget.querySelector<HTMLElement>('.photo-bg');
        if (img) img.style.transform = 'scale(1)';
        const cap = e.currentTarget.querySelector<HTMLElement>('.photo-cap');
        if (cap) cap.style.transform = 'translateY(100%)';
      }}
    >
      {/* placeholder gradient */}
      <div
        className="photo-bg"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${135 + i * 7}deg, oklch(0.35 0.12 ${g.hue}) 0%, oklch(0.18 0.08 ${g.hue + 30}) 50%, oklch(0.12 0.04 ${g.hue}) 100%)`,
          transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />
      {/* placeholder pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
        <defs>
          <pattern id={`grid-${i}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
      </svg>
      {/* placeholder mark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.2em',
        }}
      >
        IMG_{String(i + 1).padStart(3, '0')}
      </div>
      {/* corner index */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 10,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em',
        }}
      >
        {String(i + 1).padStart(2, '0')}/{GALLERY.length}
      </div>
      {/* caption hover */}
      <div
        className="photo-cap"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '14px 14px 12px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
          fontSize: 12,
          color: '#fff',
          transform: 'translateY(100%)',
          transition: 'transform 0.3s',
        }}
      >
        {g.caption}
      </div>
    </div>
  );
}

function Lightbox({ idx, setIdx }: { idx: number; setIdx: Dispatch<SetStateAction<number | null>> }) {
  const g = GALLERY[idx];
  return (
    <div
      onClick={() => setIdx(null)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,6,9,0.94)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <button
        onClick={e => {
          e.stopPropagation();
          setIdx(i => (i === null ? GALLERY.length - 1 : (i - 1 + GALLERY.length) % GALLERY.length));
        }}
        style={lbBtn('left')}
      >
        ‹
      </button>
      <button
        onClick={e => {
          e.stopPropagation();
          setIdx(i => (i === null ? 0 : (i + 1) % GALLERY.length));
        }}
        style={lbBtn('right')}
      >
        ›
      </button>
      <button
        onClick={e => {
          e.stopPropagation();
          setIdx(null);
        }}
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          fontSize: 18,
          color: '#fff',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.1em',
        }}
      >
        ESC ✕
      </button>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(900px, 80vw)',
          height: 'min(680px, 80vh)',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.15)',
          background: `linear-gradient(${135 + idx * 7}deg, oklch(0.4 0.14 ${g.hue}) 0%, oklch(0.18 0.08 ${g.hue + 30}) 50%, oklch(0.12 0.04 ${g.hue}) 100%)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.2em',
          }}
        >
          IMG_{String(idx + 1).padStart(3, '0')}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '18px 24px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 14 }}>{g.caption}</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            {idx + 1} / {GALLERY.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function lbBtn(side: 'left' | 'right'): CSSProperties {
  return {
    position: 'absolute',
    [side]: 24,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 48,
    height: 48,
    borderRadius: 24,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}
