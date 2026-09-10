import Image from "next/image";
import Link from "@/components/link";
import type { Project } from "@/lib/content";
import { Arrow } from "./ui";

// These are deliberately non-interactive interface studies, not live client sites.
export function ProjectPreview({ project }: { project: Project }) {
  if (project.image) return <div className="project-preview"><Image src={project.image} alt={project.imageAlt} width={960} height={640} sizes="(max-width: 720px) 100vw, 50vw" className="project-image" /></div>;
  return <div className={`project-preview preview-${project.preview}`} role="img" aria-label={project.imageAlt}>
    <div className="preview-browser" aria-hidden="true"><div className="preview-toolbar"><span>● ● ●</span><span>{project.label.toLowerCase()} / {project.preview}</span><span>↗</span></div>
      {project.preview === "coffee" && <div className="coffee-ui"><div className="mini-nav"><b>Sunday Coffee<span>®</span></b><span>Menu &nbsp; Visit us</span></div><div className="coffee-main"><span className="mini-label">YOUR NEIGHBOURHOOD COFFEE STOP</span><strong>Good coffee.<br /><em>No hurry.</em></strong><div className="coffee-bottom"><span className="mini-button">Explore the menu ↗</span><span>Drop in. Stay a while.<br />Coffee, pastries & good company.</span></div></div><div className="coffee-strip"><span>The menu</span><span>Opening hours</span><span>Find your way here ↗</span></div></div>}
      {project.preview === "barber" && <div className="barber-ui"><div className="mini-nav"><b>THE GOOD CUT</b><span>Appointment request</span></div><div className="barber-main"><div><span className="mini-label">A LITTLE TIME FOR YOURSELF</span><strong>Your next<br />good cut.</strong><p>Choose a service.<br />We’ll confirm a time.</p></div><div className="booking-study"><span>01 / PICK A SERVICE</span><div><b>Haircut</b><span>○</span></div><div><b>Cut + beard</b><span>○</span></div><p>Next: your preferred time →</p></div></div></div>}
      {project.preview === "service" && <div className="service-ui"><div className="mini-nav"><b>FIELDWORK / HOME & GARDEN</b><span>Services &nbsp; Contact</span></div><strong>A little help<br />around the place.</strong><p>Garden care. Small repairs. Seasonal upkeep.</p><div className="service-strip"><span>What needs doing?</span><span>Tell us about the job ↗</span></div></div>}
      {project.preview === "shipping" && <div className="shipping-ui"><div className="mini-nav"><b>Dispatch / Shipment overview</b><span>Sample data</span></div><strong>A clearer view of what’s moving.</strong><div className="shipment-row row-heading"><span>Reference</span><span>Status</span><span>Next action</span></div>{[["DEMO-001", "In transit", "Check arrival"], ["DEMO-002", "Awaiting pickup", "Confirm pickup"], ["DEMO-003", "Delivered", "Review delivery"]].map(row => <div className="shipment-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>)}</div>}
    </div>
  </div>;
}
export function ProjectCard({ project, detailed = false }: { project: Project; detailed?: boolean }) {
  return <article className="project-card" id={project.slug}><ProjectPreview project={project} /><div className="project-meta"><span>{project.category}</span><span className="pill">{project.label}</span></div><h3>{detailed ? project.title : <Link href={`/work/#${project.slug}`}>{project.title}<Arrow diagonal /></Link>}</h3>{detailed ? <><dl className="project-details"><div><dt>The problem</dt><dd>{project.problem}</dd></div><div><dt>The proposed improvement</dt><dd>{project.improvement}</dd></div><div><dt>The intended result</dt><dd>{project.outcome}</dd></div></dl><div className="tech-list" aria-label="Technologies in this study">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>{project.url && <a className="text-link" href={project.url}>Visit {project.label.toLowerCase()} <Arrow diagonal /></a>}</> : <p>{project.improvement}</p>}</article>;
}
