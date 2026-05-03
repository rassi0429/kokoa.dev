// --- Footer -------------------------------------------------------
export function Footer() {
  return (
    <footer style={{ padding: '0 6vw 60px' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          fontFamily: '"JetBrains Mono", monospace',
          color: 'rgba(238,240,242,0.4)',
        }}
      >
        <div>2012—2026 KOKOA (@kokoa0429)</div>
        <div>Built with {'<'}3 in HTML/React</div>
      </div>
    </footer>
  );
}
