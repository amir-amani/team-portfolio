import Link from "@/components/link";
import type { ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
export function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`button ${secondary ? "button-secondary" : "button-primary"}`}>{children}<Arrow /></Link>;
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="container page-intro"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><div className="intro-copy">{children}</div></section>;
}
