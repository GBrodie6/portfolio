import type { CSSProperties } from "react";

/** Faint concentric contour rings for background depth. */
export default function Contours({
  className = "",
  cx = "80%",
  cy = "30%",
  parallax,
}: {
  className?: string;
  cx?: string;
  cy?: string;
  parallax?: number;
}) {
  const style = { "--cx": cx, "--cy": cy } as CSSProperties;
  return (
    <div
      className={`contours ${className}`}
      aria-hidden="true"
      style={style}
      {...(parallax != null ? { "data-parallax": String(parallax) } : {})}
    />
  );
}
