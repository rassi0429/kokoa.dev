import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { SectionHeader } from '../components';
import { GALLERY_PHOTOS } from '../data';
import type { GalleryPhoto, Tweaks } from '../types';

export function Gallery({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx(i => (i === null ? 0 : (i + 1) % GALLERY_PHOTOS.length));
      if (e.key === 'ArrowLeft')
        setOpenIdx(i =>
          i === null ? GALLERY_PHOTOS.length - 1 : (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
        );
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx]);

  return (
    <section id="gallery" data-screen-label="05 Gallery" style={{ padding: '100px 6vw' }}>
      <SectionHeader num="05" title="Gallery" subtitle={L ? 'Photos from VR' : 'VRからのスナップ'} />
      <div style={{ maxWidth: 1400, margin: '40px auto 0' }}>
        <div
          style={{
            columnGap: 14,
          }}
          className="masonry-cols"
        >
          {GALLERY_PHOTOS.map((photo, i) => (
            <PhotoTile key={photo.id} photo={photo} index={i} english={L} onOpen={() => setOpenIdx(i)} />
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
            ? '// Click any photo to enlarge / use arrows / Esc to close'
            : '// 写真をクリックで拡大 / 矢印キーで移動 / Escで閉じる'}
        </div>
      </div>
      {openIdx !== null && <Lightbox idx={openIdx} english={L} setIdx={setOpenIdx} />}
    </section>
  );
}

function PhotoTile({
  photo,
  index,
  english,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  english: boolean;
  onOpen: () => void;
}) {
  const caption = english ? photo.caption_en : photo.caption_jp;

  return (
    <button
      type="button"
      aria-label={`${caption}を開く`}
      onClick={onOpen}
      style={{
        breakInside: 'avoid',
        margin: '0 0 14px',
        padding: 0,
        width: '100%',
        height: photo.height,
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(14,16,22,0.4)',
        overflow: 'hidden',
        color: '#fff',
        textAlign: 'left',
        display: 'block',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        const img = e.currentTarget.querySelector<HTMLElement>('.photo-img');
        if (img) img.style.transform = 'scale(1.04)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        const img = e.currentTarget.querySelector<HTMLElement>('.photo-img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <img
        className="photo-img"
        src={photo.src}
        alt={caption}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.55s cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 10,
          left: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.75)',
          textShadow: '0 1px 12px rgba(0,0,0,0.8)',
        }}
      >
        {String(index + 1).padStart(2, '0')}/{GALLERY_PHOTOS.length}
      </span>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '34px 14px 13px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0))',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>{caption}</span>
      </div>
    </button>
  );
}

function Lightbox({
  idx,
  english,
  setIdx,
}: {
  idx: number;
  english: boolean;
  setIdx: Dispatch<SetStateAction<number | null>>;
}) {
  const photo = GALLERY_PHOTOS[idx];
  const caption = english ? photo.caption_en : photo.caption_jp;

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
        padding: '72px 5vw 40px',
      }}
    >
      <button
        aria-label={english ? 'Previous photo' : '前の写真'}
        onClick={e => {
          e.stopPropagation();
          setIdx(i =>
            i === null ? GALLERY_PHOTOS.length - 1 : (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
          );
        }}
        style={lbBtn('left')}
      >
        ‹
      </button>
      <button
        aria-label={english ? 'Next photo' : '次の写真'}
        onClick={e => {
          e.stopPropagation();
          setIdx(i => (i === null ? 0 : (i + 1) % GALLERY_PHOTOS.length));
        }}
        style={lbBtn('right')}
      >
        ›
      </button>
      <button
        aria-label={english ? 'Close photo' : '写真を閉じる'}
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
        ESC ×
      </button>
      <figure
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(1180px, 86vw)',
          maxHeight: '86vh',
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <img
          src={photo.src}
          alt={caption}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '76vh',
            objectFit: 'contain',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
            background: '#050609',
          }}
        />
        <figcaption
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
            alignItems: 'center',
            color: '#fff',
          }}
        >
          <span style={{ fontSize: 14 }}>{caption}</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            {idx + 1} / {GALLERY_PHOTOS.length}
          </span>
        </figcaption>
      </figure>
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
    fontSize: 28,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  };
}
