import Link from "@/components/link";
import { processSteps, services } from "@/lib/content";
import { Arrow, Button, Eyebrow } from "./ui";
export function Sprint({ compact = false }: { compact?: boolean }) {
  return <section className="sprint-section" id="website-rescue-sprint"><div className="container sprint-grid"><div><Eyebrow>A good place to start</Eyebrow><h2>Your website might need<br />a fix. <span className="muted-light">Not a fresh start.</span></h2><p>A mobile page that’s hard to use. A buried contact link. An inquiry flow that asks too much. Let’s work on the part that matters.</p><Button href="/contact/?interest=rescue">Ask for a tailored example</Button></div><div className="sprint-detail"><span className="pill pill-dark">Website Rescue Sprint</span><h3>One problem.<br />A clear plan.<br />A useful improvement.</h3><ul>{["Focused scope, agreed together", "Fast turnaround on a defined schedule", "Practical fixes, no unnecessary rebuild", "Clear deliverables before work begins"].map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul>{!compact && <Link className="text-link" href="/services/#rescue">Explore the sprint <Arrow /></Link>}</div></div></section>;
}
export function ServiceGrid({ detailed = false }: { detailed?: boolean }) {
  return <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.id} id={service.id}><div className="service-top"><span className="service-icon" aria-hidden="true">{service.icon}</span><span className="index">0{index + 1}</span></div><h3><Link href={detailed ? "/contact/" : `/services/#${service.id}`}>{service.title}<Arrow diagonal /></Link></h3><p>{service.text}</p>{detailed && <><p>{service.detail}</p><div className="deliverable"><strong>What we work toward</strong><p>{service.deliverable}</p></div></>}</article>)}</div>;
}
export function Process() {
  return <section className="container section"><div className="section-heading"><div><Eyebrow>How it works</Eyebrow><h2>A small project.<br />A straightforward process.</h2></div><p>You talk directly with me, from the first question to the final check.</p></div><ol className="process-grid">{processSteps.map(([title, text], index) => <li key={title}><span className="process-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>;
}
export function ContactCTA() {
  return <section className="container cta-wrap"><div className="contact-cta"><div><Eyebrow>Let’s make something work better</Eyebrow><h2>Have one part of your website<br className="desktop-break" /> that needs attention?</h2><p>Send me the page or problem and I’ll tell you whether I think I can help.</p></div><Button href="/contact/">Start a conversation</Button></div></section>;
}
