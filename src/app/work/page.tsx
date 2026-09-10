import { PageIntro } from "@/components/ui";
import { ProjectCard } from "@/components/projects";
import { ContactCTA } from "@/components/sections";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Website Concepts & Web Application Demos", "Explore honest concepts for a coffee shop website, barbershop booking flow, local service landing page, and lightweight shipping application by Amir Amani.", "/work/");
export default function WorkPage() {
  return <><PageIntro eyebrow="Work / Examples & explorations" title="A few ways to make the everyday easier."><p>These are self-initiated concepts and interface demos, not paid client projects. Each starts with a practical problem and shows the improvement I would explore.</p></PageIntro><section className="container content-section" aria-labelledby="examples-heading"><h2 id="examples-heading" className="sr-only">Project concepts and demos</h2><p className="section-note">Visual studies only: the previews below are not interactive websites. Technology lists describe the proposed implementation; no client results are claimed.</p><div className="project-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} detailed />)}</div></section><ContactCTA /></>;
}
