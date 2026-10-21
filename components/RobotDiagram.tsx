/**
 * Robot systems schematic, labeled only with sourced facts (FACTS.md).
 * Each part draws itself as the diagram scrolls through the viewport, using a
 * CSS view timeline, and its label appears once the part is drawn. Without
 * scroll-driven animation support, or with reduced motion, it is shown fully
 * drawn.
 */
export default function RobotDiagram() {
  return (
    <figure className="diagram">
      <svg viewBox="0 0 620 440" role="img" aria-labelledby="robot-diagram-title">
        <title id="robot-diagram-title">
          Robot systems: a six-motor drivetrain, an inertial sensor, a lift, and a claw with pitch and roll.
        </title>

        {/* Drivetrain */}
        <g className="part part-1">
          <path pathLength={1} d="M80 300H460V336H80Z" />
          <circle pathLength={1} cx="140" cy="352" r="30" />
          <circle pathLength={1} cx="400" cy="352" r="30" />
        </g>
        <g className="label label-1">
          <path d="M246 336V398H286" className="leader" />
          <text x="292" y="398" className="t-head">Drivetrain</text>
          <text x="292" y="422" className="t-sub">six motors</text>
        </g>

        {/* Sensing */}
        <g className="part part-2">
          <path pathLength={1} d="M118 278H152V300H118Z" />
          <circle pathLength={1} cx="135" cy="289" r="5" />
        </g>
        <g className="label label-2">
          <path d="M135 278V246" className="leader" />
          <text x="40" y="214" className="t-head">Sensing</text>
          <text x="40" y="238" className="t-sub">inertial sensor</text>
        </g>

        {/* Lift */}
        <g className="part part-3">
          <path pathLength={1} d="M318 300V96M346 300V96M318 96H346" />
          <path pathLength={1} d="M312 150H352V176H312Z" />
        </g>
        <g className="label label-3">
          <path d="M318 206H256" className="leader" />
          <text x="250" y="211" textAnchor="end" className="t-head">Lift</text>
        </g>

        {/* Claw */}
        <g className="part part-4">
          <path pathLength={1} d="M352 163H452" />
          <path pathLength={1} d="M452 150V176M452 150L496 140M452 176L496 186" />
          <path pathLength={1} d="M474 118A40 40 0 0 1 512 152" className="motion" />
          <ellipse pathLength={1} cx="410" cy="163" rx="10" ry="24" className="motion" />
        </g>
        <g className="label label-4">
          <path d="M496 186L512 230" className="leader" />
          <text x="470" y="256" className="t-head">Claw</text>
          <text x="470" y="280" className="t-sub">pitch and roll</text>
        </g>
      </svg>
      <figcaption>Systems schematic, not to scale.</figcaption>
    </figure>
  );
}
