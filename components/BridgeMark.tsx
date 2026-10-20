/** The finished bridge, small and static: the logo mark. */
export default function BridgeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden="true">
      <g style={{ stroke: "var(--c-blue)" }} strokeWidth="1" fill="none">
        <path d="M30 3L8 17M30 5L15 17M30 7L22 17M30 3L46 17M30 5L41 17M30 7L36 17" />
      </g>
      <g style={{ fill: "var(--c-graphite)" }}>
        <path d="M28.6 2H31.4L32.5 23H27.5Z" />
        <rect x="1" y="17" width="46" height="2.2" />
      </g>
    </svg>
  );
}
