import { PROJECTS } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";
import BridgeMark from "@/components/BridgeMark";

// The span closes behind this section as the page ends.
export default function Footer() {
  return (
    <footer id="links" className="footer" aria-labelledby="links-h">
      <div className="wrap">
        <div className="panel col-text">
          <SplitHeading id="links-h">Live sites</SplitHeading>
          <ul className="live-list mt-7">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <a href={p.url} target="_blank" rel="noopener" className="text-link">
                  {p.host}
                </a>
                <span className="text-steel">{p.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-bar panel">
          <BridgeMark className="mark" />
          <span>© 2026 Griffin Brodie</span>
        </div>
      </div>
    </footer>
  );
}
