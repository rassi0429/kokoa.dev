export function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9998,
        background: 'rgba(255,255,255,0.04)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: String(pct * 100) + '%',
          background: 'var(--accent)',
          transition: 'width 0.1s',
        }}
      />
    </div>
  );
}
