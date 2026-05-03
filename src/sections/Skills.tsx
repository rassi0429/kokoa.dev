import { SectionHeader } from '../components';
import { SKILLS } from '../data';
import type { Tweaks } from '../types';

const GROUP_COPY: Record<string, { jp: string; en: string }> = {
  'Web / App': {
    jp: '画面とアプリの体験を作るところ',
    en: 'UI and app experience layer',
  },
  'Backend / Data': {
    jp: 'API、サーバー、データまわり',
    en: 'APIs, servers, and data handling',
  },
  'VR / 3D': {
    jp: 'VR空間と3D制作まわり',
    en: 'VR spaces and 3D tools',
  },
  'Hardware / FPGA': {
    jp: '基板、FPGA、低レイヤ寄り',
    en: 'PCB, FPGA, and lower-level work',
  },
  'Infra / Ops': {
    jp: '公開、運用、環境づくり',
    en: 'Deployment and operations',
  },
};

// --- Skills --------------------------------------------------------
export function Skills({ tweaks }: { tweaks: Tweaks }) {
  const L = tweaks.lang === 'en';
  return (
    <section id="skills" data-screen-label="04 Stack" style={{ padding: '100px 6vw' }}>
      <SectionHeader num="04" title="Stack" subtitle={L ? 'Tools I reach for' : '普段触っているもの'} />
      <div
        style={{
          maxWidth: 1280,
          margin: '40px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
          gap: 16,
        }}
      >
        {SKILLS.map((group, index) => (
          <StackGroup key={group.group} group={group.group} items={group.items} index={index} english={L} />
        ))}
      </div>
    </section>
  );
}

function StackGroup({
  group,
  items,
  index,
  english,
}: {
  group: string;
  items: string[];
  index: number;
  english: boolean;
}) {
  const copy = GROUP_COPY[group];

  return (
    <article
      style={{
        minHeight: 230,
        padding: '22px 20px 20px',
        border: '1px solid rgba(255,255,255,0.09)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.052), rgba(255,255,255,0.018) 64%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 8,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 56,
          lineHeight: 1,
          color: 'rgba(238,240,242,0.035)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 14,
          marginBottom: 16,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              letterSpacing: '0.16em',
              color: 'var(--accent)',
              marginBottom: 8,
            }}
          >
            STACK / {String(index + 1).padStart(2, '0')}
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: 22,
              lineHeight: 1.15,
              fontFamily: 'Manrope, "Zen Kaku Gothic New", sans-serif',
            }}
          >
            {group}
          </h3>
        </div>
        <span
          style={{
            flex: '0 0 auto',
            padding: '5px 8px',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(238,240,242,0.58)',
            fontSize: 10,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.08em',
          }}
        >
          {items.length} ITEMS
        </span>
      </div>

      <p
        style={{
          margin: '0 0 20px',
          color: 'rgba(238,240,242,0.62)',
          fontSize: 13,
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {copy ? (english ? copy.en : copy.jp) : english ? 'Tools and libraries' : '使っているもの'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, position: 'relative', zIndex: 1 }}>
        {items.map(item => (
          <span
            key={item}
            style={{
              padding: '7px 11px',
              fontSize: 12,
              fontFamily: '"JetBrains Mono", monospace',
              border: '1px solid rgba(255,255,255,0.13)',
              background: 'rgba(5,6,9,0.28)',
              color: 'rgba(238,240,242,0.82)',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.045)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)';
              e.currentTarget.style.color = 'rgba(238,240,242,0.82)';
              e.currentTarget.style.background = 'rgba(5,6,9,0.28)';
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
