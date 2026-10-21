/** A dimension line between sections that draws itself as it crosses the view. */
export default function Divider() {
  return (
    <div className="wrap" aria-hidden="true">
      <svg className="divider" viewBox="0 0 1000 24" preserveAspectRatio="none">
        <path pathLength={1} d="M0 12H1000" />
        <path pathLength={1} d="M4 4L12 20M988 4L996 20" className="divider-ticks" />
      </svg>
    </div>
  );
}
