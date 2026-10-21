import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content";
import TransitionLink from "@/components/TransitionLink";

const vt = (name: string) => ({ viewTransitionName: name }) as CSSProperties;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} | Griffin Brodie`,
    description: p.line,
    alternates: { canonical: `https://griffinbrodie.site/projects/${p.slug}` },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const i = PROJECTS.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <main className="page relative z-10">
      <div className="wrap page-top">
        <TransitionLink href="/#projects" className="text-link">
          All projects
        </TransitionLink>
        <h1 className="display text-display mt-6" style={vt(`title-${p.slug}`)}>
          {p.title}
        </h1>
        <div className="project-hero mt-7" style={vt(`shot-${p.slug}`)}>
          <Image src={p.shot} alt={`${p.title}, screenshot of the live site`} fill priority sizes="(max-width: 1023px) 100vw, 80vw" />
        </div>
        <div className="panel col-text mt-8">
          <p className="text-lead">{p.line}</p>
          <ul className="facts mt-6">
            {p.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <dl className="meta mt-7">
            {p.year && (
              <div>
                <dt>Built</dt>
                <dd>{p.year}</dd>
              </div>
            )}
            <div>
              <dt>Stack</dt>
              <dd>{p.stack.join(", ")}</dd>
            </div>
            <div>
              <dt>Live</dt>
              <dd>
                <a href={p.url} target="_blank" rel="noopener" className="text-link">
                  {p.host}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="page-next panel col-text">
          <span className="text-steel">Next project</span>
          <TransitionLink href={`/projects/${next.slug}`} className="display text-title next-link">
            {next.title}
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
