import { ABOUT } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="wrap">
        <div className="panel col-text">
          <SplitHeading id="about-h">About</SplitHeading>
          {ABOUT.map((p, i) => (
            <p key={i} className={`max-w-measure ${i ? "mt-5 text-steel" : "mt-8 text-lead"}`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
