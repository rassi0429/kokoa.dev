import type { MouseState } from '../types';

export function Cursor({ mouse, enabled }: { mouse: MouseState; enabled: boolean }) {
  if (!enabled) return null;
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: mouse.rawX,
          top: mouse.rawY,
          width: 8,
          height: 8,
          borderRadius: 4,
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%,-50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: mouse.rawX,
          top: mouse.rawY,
          width: 40,
          height: 40,
          borderRadius: 20,
          border: '1px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: 0.5,
        }}
      />
    </>
  );
}
